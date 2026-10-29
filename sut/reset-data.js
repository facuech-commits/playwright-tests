/**
 * Resets data.json back to its initial seed: default users and three sample
 * courses (one with no sections, one with two, one with five).
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const BASE_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(BASE_DIR, 'data.json');

function section(name, type, content) {
  return { id: crypto.randomUUID(), name, type, content };
}

function course(name, description, sections) {
  return { id: crypto.randomUUID(), name, description, sections };
}

function buildSeed() {
  return {
    users: [
      { user: 'Carlos', pass: 'VazFerreira', role: 'admin' },
      { user: 'Mario', pass: 'Benedetti', role: 'writer' },
    ],
    courses: [
      course('Introducción a Python', 'Fundamentos del lenguaje Python para principiantes.', []),
      course(
        'Desarrollo Web con JavaScript',
        'Conceptos esenciales de JavaScript para el navegador.',
        [
          section(
            'Variables y tipos de datos',
            'leccion',
            'Explicación de var, let, const y los tipos primitivos de JavaScript.',
          ),
          section(
            'Cuestionario de fundamentos',
            'cuestionario',
            'Preguntas de repaso sobre variables, tipos de datos y operadores.',
          ),
        ],
      ),
      course('Bases de Datos Relacionales', 'Diseño y consulta de bases de datos usando SQL.', [
        section(
          'Introducción a SQL',
          'leccion',
          'Qué es SQL y para qué se usa en bases de datos relacionales.',
        ),
        section(
          'Modelo entidad-relación',
          'leccion',
          'Cómo diseñar tablas y relaciones a partir de un modelo E-R.',
        ),
        section(
          'Cuestionario de consultas',
          'cuestionario',
          'Preguntas sobre SELECT, WHERE, JOIN y agregaciones.',
        ),
        section(
          'Diagrama de ejemplo',
          'recurso',
          'Diagrama de referencia de un esquema de base de datos normalizado.',
        ),
        section(
          'Ejercicio de normalización',
          'cuestionario',
          'Ejercicio práctico para llevar un esquema a tercera forma normal.',
        ),
      ]),
    ],
  };
}

function main() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(buildSeed(), null, 2), 'utf-8');
  console.log(`data.json reset at ${DATA_FILE}`);
}

main();
