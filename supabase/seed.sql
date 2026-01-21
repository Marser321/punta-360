-- Seed data for Punta360 Demo
-- Run this in Supabase SQL Editor

-- Insert sample properties
INSERT INTO properties (id, owner_id, title, address, price, property_type, listing_type, bedrooms, bathrooms, area_sqm, description, status, created_at)
VALUES
  (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    '00000000-0000-0000-0000-000000000000',
    'Penthouse Brava 22',
    'Av. Brava 2200, Punta del Este',
    850000,
    'apartment',
    'sale',
    3,
    3,
    220,
    'Espectacular penthouse con vista panorámica al mar. 3 dormitorios en suite, living comedor con doble altura, cocina de diseño italiano. Amenities: piscina climatizada, gimnasio, sauna y seguridad 24hs. Ideal para inversores que buscan rentabilidad en temporada.',
    'active',
    NOW()
  ),
  (
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    '00000000-0000-0000-0000-000000000000',
    'Casa Contemporánea José Ignacio',
    'Camino Arenas de José Ignacio, Lote 45',
    2400000,
    'house',
    'sale',
    5,
    4,
    450,
    'Obra maestra arquitectónica en el corazón de José Ignacio. Diseño minimalista con espacios abiertos, piscina infinity con vista a la laguna, jardín de 2000m². Concha acústica exterior para eventos. A 5 minutos de playa y restaurantes gourmet.',
    'active',
    NOW() - INTERVAL '2 days'
  ),
  (
    'c3d4e5f6-a7b8-9012-cdef-345678901234',
    '00000000-0000-0000-0000-000000000000',
    'Apartamento Mansa Premium',
    'Rambla Williman 1450, Punta del Este',
    320000,
    'apartment',
    'sale',
    2,
    2,
    95,
    'Apartamento completamente reciclado a nuevo. Vista frontal a PlayaMansa. 2 dormitorios, 2 baños, balcón terraza con parrillero. Edificio con amenities completos. Excelente oportunidad de inversión con renta garantizada.',
    'active',
    NOW() - INTERVAL '5 days'
  ),
  (
    'd4e5f6a7-b8c9-0123-def0-456789012345',
    '00000000-0000-0000-0000-000000000000',
    'Villa Manantiales Exclusiva',
    'Calle Los Eucaliptos 234, Manantiales',
    3100000,
    'house',
    'sale',
    6,
    5,
    600,
    'Villa de lujo en barrio privado Manantiales. 6 suites con baño en suite, cine en casa, bodega climatizada, garage para 4 autos. Jardín tropical con piscina climatizada y spa. Personal de servicio incluido en temporada.',
    'active',
    NOW() - INTERVAL '7 days'
  ),
  (
    'e5f6a7b8-c9d0-1234-ef01-567890123456',
    '00000000-0000-0000-0000-000000000000',
    'Loft Industrial La Barra',
    'Ruta 10 Km 160, La Barra',
    185000,
    'apartment',
    'rent',
    1,
    1,
    85,
    'Loft de diseño único estilo industrial. Techos altos de 5m, ventanales de piso a techo, cocina integrada de acero. Perfecto para artistas o profesionales creativos. Alquiler anual con opción a compra. Cerca de todo pero con privacidad total.',
    'active',
    NOW() - INTERVAL '10 days'
  );

-- Optional: Insert a sample lead for demo
INSERT INTO leads (id, property_id, visitor_name, visitor_contact, intent_data, is_read, created_at)
VALUES
  (
    'f6a7b8c9-d0e1-2345-f012-678901234567',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Carlos Méndez',
    '+54 911 5555 1234',
    '{"intent": "buy", "budget": "USD 800k-900k", "travel_dates": "Febrero 2024"}',
    false,
    NOW() - INTERVAL '1 hour'
  ),
  (
    'a7b8c9d0-e1f2-3456-0123-789012345678',
    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    'María Fernández',
    'maria.fernandez@gmail.com',
    '{"intent": "buy", "budget": "USD 2M+", "notes": "Inversión familiar"}',
    true,
    NOW() - INTERVAL '2 days'
  );
