/**
 * Mock API + static server
 *
 * Endpoints:
 *   GET  /api/users                          -> list of mock users (user/pass/role)
 *   GET  /api/courses                        -> list of courses (each with nested sections)
 *   GET  /api/courses/<id>                   -> single course (with nested sections)
 *   POST /api/courses                        -> create a course {name, description}
 *   PUT  /api/courses/<id>                   -> update a course {name, description}
 *   POST /api/courses/<id>/sections          -> create a section {name, type, content}
 *   PUT  /api/courses/<id>/sections/<sid>    -> update a section {name, type, content}
 *   DELETE /api/courses/<id>/sections/<sid>  -> delete a section
 *
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(BASE_DIR, 'public');
const DATA_FILE = path.join(BASE_DIR, 'data.json');

const SECTION_TYPES = new Set(['leccion', 'cuestionario', 'recurso']);

const MAX_NAME_LENGTH = 50;
const MAX_TEXT_LENGTH = 500;

const COURSE_SECTION_ID_RE = /^\/api\/courses\/([^/]+)\/sections\/([^/]+)\/?$/;
const COURSE_SECTIONS_RE = /^\/api\/courses\/([^/]+)\/sections\/?$/;
const COURSE_ID_RE = /^\/api\/courses\/([^/]+)\/?$/;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload), 'utf-8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function serveStatic(res, reqPath) {
  if (reqPath === '/') reqPath = '/login.html';
  const safePath = path.normalize(decodeURIComponent(reqPath)).replace(/^[/\\]+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (
    !filePath.startsWith(PUBLIC_DIR) ||
    !fs.existsSync(filePath) ||
    !fs.statSync(filePath).isFile()
  ) {
    sendJson(res, 404, { error: 'not found' });
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const body = fs.readFileSync(filePath);
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
    'Content-Length': body.length,
  });
  res.end(body);
}

function handleGet(res, reqPath) {
  if (reqPath === '/api/users') {
    sendJson(res, 200, readData().users);
    return;
  }

  if (reqPath === '/api/courses') {
    sendJson(res, 200, readData().courses);
    return;
  }

  const courseMatch = COURSE_ID_RE.exec(reqPath);
  if (courseMatch) {
    const course = readData().courses.find((c) => c.id === courseMatch[1]);
    if (!course) {
      sendJson(res, 404, { error: 'course not found' });
    } else {
      sendJson(res, 200, course);
    }
    return;
  }

  serveStatic(res, reqPath);
}

async function handlePost(req, res, reqPath) {
  if (reqPath === '/api/courses') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      sendJson(res, 400, { error: 'invalid json' });
      return;
    }

    const name = (body.name || '').trim();
    const description = (body.description || '').trim();
    if (!name || !description) {
      sendJson(res, 400, { error: 'name and description are required' });
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      sendJson(res, 400, { error: `name must be at most ${MAX_NAME_LENGTH} characters` });
      return;
    }
    if (description.length > MAX_TEXT_LENGTH) {
      sendJson(res, 400, { error: `description must be at most ${MAX_TEXT_LENGTH} characters` });
      return;
    }

    const data = readData();
    const course = { id: crypto.randomUUID(), name, description, sections: [] };
    data.courses.push(course);
    writeData(data);
    sendJson(res, 201, course);
    return;
  }

  const sectionsMatch = COURSE_SECTIONS_RE.exec(reqPath);
  if (sectionsMatch) {
    const courseId = sectionsMatch[1];
    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      sendJson(res, 400, { error: 'invalid json' });
      return;
    }

    const name = (body.name || '').trim();
    const sectionType = (body.type || '').trim();
    const content = body.content || '';

    if (!name || !SECTION_TYPES.has(sectionType)) {
      sendJson(res, 400, {
        error: 'name is required and type must be one of: ' + [...SECTION_TYPES].sort().join(', '),
      });
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      sendJson(res, 400, { error: `name must be at most ${MAX_NAME_LENGTH} characters` });
      return;
    }
    if (content.length > MAX_TEXT_LENGTH) {
      sendJson(res, 400, { error: `content must be at most ${MAX_TEXT_LENGTH} characters` });
      return;
    }

    const data = readData();
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) {
      sendJson(res, 404, { error: 'course not found' });
      return;
    }

    const section = { id: crypto.randomUUID(), name, type: sectionType, content };
    course.sections.push(section);
    writeData(data);
    sendJson(res, 201, section);
    return;
  }

  sendJson(res, 404, { error: 'not found' });
}

async function handlePut(req, res, reqPath) {
  const sectionMatch = COURSE_SECTION_ID_RE.exec(reqPath);
  if (sectionMatch) {
    const [, courseId, sectionId] = sectionMatch;
    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      sendJson(res, 400, { error: 'invalid json' });
      return;
    }

    const name = (body.name || '').trim();
    const sectionType = (body.type || '').trim();
    const content = body.content || '';

    if (!name || !SECTION_TYPES.has(sectionType)) {
      sendJson(res, 400, {
        error: 'name is required and type must be one of: ' + [...SECTION_TYPES].sort().join(', '),
      });
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      sendJson(res, 400, { error: `name must be at most ${MAX_NAME_LENGTH} characters` });
      return;
    }
    if (content.length > MAX_TEXT_LENGTH) {
      sendJson(res, 400, { error: `content must be at most ${MAX_TEXT_LENGTH} characters` });
      return;
    }

    const data = readData();
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) {
      sendJson(res, 404, { error: 'course not found' });
      return;
    }

    const section = course.sections.find((s) => s.id === sectionId);
    if (!section) {
      sendJson(res, 404, { error: 'section not found' });
      return;
    }

    section.name = name;
    section.type = sectionType;
    section.content = content;
    writeData(data);
    sendJson(res, 200, section);
    return;
  }

  const courseMatch = COURSE_ID_RE.exec(reqPath);
  if (courseMatch) {
    const courseId = courseMatch[1];
    let body;
    try {
      body = await readJsonBody(req);
    } catch (err) {
      sendJson(res, 400, { error: 'invalid json' });
      return;
    }

    const name = (body.name || '').trim();
    const description = (body.description || '').trim();
    if (!name || !description) {
      sendJson(res, 400, { error: 'name and description are required' });
      return;
    }
    if (name.length > MAX_NAME_LENGTH) {
      sendJson(res, 400, { error: `name must be at most ${MAX_NAME_LENGTH} characters` });
      return;
    }
    if (description.length > MAX_TEXT_LENGTH) {
      sendJson(res, 400, { error: `description must be at most ${MAX_TEXT_LENGTH} characters` });
      return;
    }

    const data = readData();
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) {
      sendJson(res, 404, { error: 'course not found' });
      return;
    }

    course.name = name;
    course.description = description;
    writeData(data);
    sendJson(res, 200, course);
    return;
  }

  sendJson(res, 404, { error: 'not found' });
}

function handleDelete(res, reqPath) {
  const sectionMatch = COURSE_SECTION_ID_RE.exec(reqPath);
  if (sectionMatch) {
    const [, courseId, sectionId] = sectionMatch;
    const data = readData();
    const course = data.courses.find((c) => c.id === courseId);
    if (!course) {
      sendJson(res, 404, { error: 'course not found' });
      return;
    }

    const index = course.sections.findIndex((s) => s.id === sectionId);
    if (index === -1) {
      sendJson(res, 404, { error: 'section not found' });
      return;
    }

    course.sections.splice(index, 1);
    writeData(data);
    res.writeHead(204);
    res.end();
    return;
  }

  sendJson(res, 404, { error: 'not found' });
}

const server = http.createServer((req, res) => {
  const reqPath = req.url.split('?')[0];

  if (req.method === 'GET') {
    handleGet(res, reqPath);
  } else if (req.method === 'POST') {
    handlePost(req, res, reqPath);
  } else if (req.method === 'PUT') {
    handlePut(req, res, reqPath);
  } else if (req.method === 'DELETE') {
    handleDelete(res, reqPath);
  } else {
    sendJson(res, 405, { error: 'method not allowed' });
  }
});

const port = parseInt(process.env.PORT || '8000', 10);
server.listen(port, () => {
  console.log(`Nandi mock server running at http://localhost:${port}`);
});
