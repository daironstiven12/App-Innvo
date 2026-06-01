USE academico_app;

-- Estudiantes
INSERT INTO estudiantes (nombre, carrera, institucion, iniciales, correo, telefono, direccion, ingreso) VALUES
('DAIRON STIVEN', 'Ingeniería de Telecomunicaciones e Informática', 'Universidad Tecnológica del Chocó', 'DS', 'dairon.stiven@utc.edu.co', '+57 321 456 7890', 'Quibdó, Chocó', '2024 - I');

-- Periodos
INSERT INTO periodos (nombre, activo) VALUES
('Periodo 1', 0),
('Periodo 2', 0),
('Periodo 3', 1);

-- Materias
INSERT INTO materias (nombre, docente) VALUES
('Programación', 'Dairon Stiven'),
('Redes', 'Carlos Mosquera'),
('Linux', 'María Pérez'),
('Bases de Datos', 'Juan López'),
('Matemáticas', 'Ana García'),
('Inglés Técnico', 'Laura Sánchez'),
('Electrónica', 'Pedro Ramírez'),
('Sistemas Operativos', 'Diana Torres'),
('Inglés', 'Laura Sánchez'),
('Física', 'Pedro Ramírez'),
('Química', 'Marta Gómez'),
('Estadística', 'Juan López'),
('Filosofía', 'Carlos Ruiz'),
('Tecnología e Informática', 'Dairon Stiven'),
('Educación Ética', 'Ana García'),
('Educación Física', 'Luis Martínez'),
('Educación Artística', 'Sandra Castro'),
('Educación Religiosa', 'Padre Miguel'),
('Español', 'Marta Gómez'),
('Pecuaria', 'Pedro Ramírez'),
('Comportamiento Formativo', 'Diana Torres'),
('Comportamiento', 'Diana Torres'),
('Agrícola', 'Carlos Mosquera'),
('Análisis', 'Juan López'),
('Economía', 'Ana García');

-- Horario (Lunes)
INSERT INTO horario (dia, inicio, fin, materia_id) VALUES
('Lunes', '07:00', '08:00', 1),
('Lunes', '08:00', '09:00', 2),
('Lunes', '09:00', '10:00', 3),
('Lunes', '10:00', '11:00', 4),
('Lunes', '11:00', '12:00', 5);

INSERT INTO horario (dia, inicio, fin, materia_id) VALUES
('Martes', '07:00', '08:00', 6),
('Martes', '08:00', '09:00', 7),
('Martes', '09:00', '10:00', 8),
('Martes', '10:00', '11:00', 1),
('Martes', '11:00', '12:00', 2);

INSERT INTO horario (dia, inicio, fin, materia_id) VALUES
('Miércoles', '07:00', '08:00', 3),
('Miércoles', '08:00', '09:00', 4),
('Miércoles', '09:00', '10:00', 5),
('Miércoles', '10:00', '11:00', 6),
('Miércoles', '11:00', '12:00', 7);

INSERT INTO horario (dia, inicio, fin, materia_id) VALUES
('Jueves', '07:00', '08:00', 8),
('Jueves', '08:00', '09:00', 1),
('Jueves', '09:00', '10:00', 2),
('Jueves', '10:00', '11:00', 3),
('Jueves', '11:00', '12:00', 4);

INSERT INTO horario (dia, inicio, fin, materia_id) VALUES
('Viernes', '07:00', '08:00', 5),
('Viernes', '08:00', '09:00', 6),
('Viernes', '09:00', '10:00', 7),
('Viernes', '10:00', '11:00', 8),
('Viernes', '11:00', '12:00', 1);

-- Calificaciones (Periodo 3 = activo)
-- Dashboard calificaciones (8 subjects)
INSERT INTO calificaciones (materia_id, nota, periodo_id) VALUES
(1, 4.5, 3),
(2, 3.8, 3),
(3, 2.9, 3),
(4, 4.2, 3),
(5, 3.1, 3),
(6, 4.8, 3),
(7, 2.5, 3),
(8, 3.5, 3);

-- Analíticas calificaciones (16 subjects with full names)
INSERT INTO calificaciones (materia_id, nota, periodo_id) VALUES
(23, 3.7, 3),
(24, 3.3, 3),
(22, 4.1, 3),
(25, 2.8, 3),
(15, 4.6, 3),
(16, 4.2, 3),
(17, 3.9, 3),
(18, 3.5, 3),
(19, 3.1, 3),
(12, 2.5, 3),
(13, 3.8, 3),
(10, 2.5, 3),
(9, 4.8, 3),
(20, 3.4, 3),
(11, 2.9, 3),
(14, 4.5, 3);

-- Periodo 2 calificaciones (for comparative period data)
INSERT INTO calificaciones (materia_id, nota, periodo_id) VALUES
(1, 4.0, 2),
(2, 3.5, 2),
(3, 3.2, 2),
(4, 3.9, 2),
(5, 3.0, 2);

-- Comparativas (for ComparativeChart: 5 categorias x 3 grupos)
INSERT INTO comparativas (categoria, grupo_label, valor, color, periodo_id) VALUES
('AGRÍCOLA', 'Estudiante', 4.2, '#3B82F6', 3),
('ANÁLISIS', 'Estudiante', 3.8, '#3B82F6', 3),
('COMPORTAMIENTO', 'Estudiante', 4.5, '#3B82F6', 3),
('ECONOMÍA', 'Estudiante', 3.0, '#3B82F6', 3),
('EDUCACIÓN', 'Estudiante', 4.1, '#3B82F6', 3);

INSERT INTO comparativas (categoria, grupo_label, valor, color, periodo_id) VALUES
('AGRÍCOLA', 'Salón', 3.5, '#10B981', 3),
('ANÁLISIS', 'Salón', 3.2, '#10B981', 3),
('COMPORTAMIENTO', 'Salón', 3.8, '#10B981', 3),
('ECONOMÍA', 'Salón', 3.1, '#10B981', 3),
('EDUCACIÓN', 'Salón', 3.6, '#10B981', 3);

INSERT INTO comparativas (categoria, grupo_label, valor, color, periodo_id) VALUES
('AGRÍCOLA', 'Institución', 3.0, '#F59E0B', 3),
('ANÁLISIS', 'Institución', 2.8, '#F59E0B', 3),
('COMPORTAMIENTO', 'Institución', 3.2, '#F59E0B', 3),
('ECONOMÍA', 'Institución', 2.9, '#F59E0B', 3),
('EDUCACIÓN', 'Institución', 3.1, '#F59E0B', 3);

-- Simple comparative (for estadisticas: Estudiante vs Salón vs Institución)
INSERT INTO comparativas (categoria, grupo_label, valor, color, periodo_id) VALUES
('Promedio General', 'Estudiante', 4.2, '#3B82F6', 3),
('Promedio General', 'Salón', 3.6, '#8B5CF6', 3),
('Promedio General', 'Institución', 3.1, '#10B981', 3);

-- Comunicados
INSERT INTO comunicados (titulo, mensaje, fecha, tipo) VALUES
('Inicio de clases', 'Las clases del Periodo 3 inician el 15 de marzo. Revisa tu horario asignado.', '2026-03-10', 'academico'),
('Suspensión de actividades', 'El día 20 de marzo no habrá actividades académicas por mantenimiento general.', '2026-03-18', 'general'),
('Resultados parciales', 'Los resultados del primer corte estarán disponibles a partir del 5 de abril.', '2026-04-01', 'academico'),
('Inscripción de asignaturas', 'La inscripción de asignaturas para el próximo periodo será del 10 al 20 de mayo.', '2026-05-05', 'academico'),
('Recordatorio de pago', 'Recuerda realizar el pago de tu matrícula antes del 30 de abril para evitar recargos.', '2026-04-15', 'financiero'),
('Charla de orientación vocacional', 'Invitamos a la charla de orientación vocacional el 25 de abril en el auditorio central.', '2026-04-20', 'evento'),
('Actualización de datos', 'Por favor actualiza tus datos de contacto en la plataforma antes del 15 de mayo.', '2026-05-01', 'general'),
('Horario de atención', 'La oficina de registro extiende su horario de atención de 7:00 AM a 7:00 PM.', '2026-04-10', 'general'),
('Convocatoria de monitores', 'Se abre convocatoria para monitores académicos. Inscripciones hasta el 30 de abril.', '2026-04-12', 'academico'),
('Taller de investigación', 'Taller de metodología de la investigación los días 8 y 9 de mayo en el laboratorio 3.', '2026-04-28', 'evento'),
('Festivo nacional', 'El 1 de mayo no habrá actividades académicas por ser festivo nacional.', '2026-04-25', 'general'),
('Entrega de certificados', 'La entrega de certificados del periodo anterior será del 15 al 20 de mayo.', '2026-05-10', 'academico'),
('Evaluación docente', 'La evaluación docente estará abierta del 20 al 30 de mayo. Tu opinión es importante.', '2026-05-15', 'academico'),
('Cierre de notas', 'El cierre de notas del Periodo 3 será el 15 de junio.', '2026-06-01', 'academico'),
('Día del estudiante', 'Celebraremos el día del estudiante el 10 de junio con actividades culturales.', '2026-06-01', 'evento'),
('Semana de exámenes', 'La semana de exámenes finales será del 20 al 25 de junio.', '2026-06-10', 'academico');
