import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sofia',
    age: 25,
    bio: '🎨 Artista digital | Amante del café ☕ | Explorando el mundo 🌍',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800'],
    interests: ['Arte', 'Viajes', 'Fotografía', 'Café'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '2',
    name: 'Lucas',
    age: 28,
    bio: '🏃‍♂️ Runner | Developer | Pizza lover 🍕 | Siempre buscando nuevas aventuras',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'],
    interests: ['Deportes', 'Tecnología', 'Cocina', 'Cine'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '3',
    name: 'Valentina',
    age: 23,
    bio: '📚 Estudiante de arquitectura | Yoga y meditación 🧘‍♀️ | Amante de los animales 🐶',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800'],
    interests: ['Arquitectura', 'Yoga', 'Naturaleza', 'Diseño'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '4',
    name: 'Mateo',
    age: 30,
    bio: '🎸 Músico | Tatuajes y rock | Buscando alguien con quien compartir conciertos 🎵',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
    interests: ['Música', 'Conciertos', 'Arte', 'Tatuajes'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '5',
    name: 'Camila',
    age: 26,
    bio: '🍷 Sommelier | Foodie empedernida | Me encanta cocinar y probar nuevos restaurantes',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'],
    interests: ['Gastronomía', 'Vinos', 'Cocina', 'Viajes'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '6',
    name: 'Diego',
    age: 27,
    bio: '⚽ Hincha de Boca | Ingeniero | Weekend hiker 🏔️ | Busco compañera de aventuras',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800'],
    interests: ['Fútbol', 'Senderismo', 'Tecnología', 'Asados'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '7',
    name: 'Martina',
    age: 24,
    bio: '💄 Makeup artist | Fashion lover | Netflix addict 📺 | Amante de los gatos 🐱',
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800'],
    interests: ['Moda', 'Maquillaje', 'Series', 'Gatos'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '8',
    name: 'Tomás',
    age: 29,
    bio: '🚀 Emprendedor | Crossfit 💪 | Amante del mate y las charlas profundas',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'],
    interests: ['Negocios', 'Fitness', 'Startups', 'Lectura'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '9',
    name: 'Julieta',
    age: 22,
    bio: '🎓 Estudiante de medicina | Bailarina de salsa 💃 | Siempre sonriendo 😊',
    photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800'],
    interests: ['Medicina', 'Baile', 'Música latina', 'Voluntariado'],
    location: 'Buenos Aires, Argentina'
  },
  {
    id: '10',
    name: 'Ezequiel',
    age: 31,
    bio: '📷 Fotógrafo | Surf y playa 🏄‍♂️ | Viajero frecuente | Buscando mi próxima historia',
    photos: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800'],
    interests: ['Fotografía', 'Surf', 'Viajes', 'Naturaleza'],
    location: 'Buenos Aires, Argentina'
  }
];

// Current user (you)
export const currentUser: User = {
  id: 'current',
  name: 'Tú',
  age: 25,
  bio: 'Buscando conocer gente nueva',
  photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800'],
  interests: ['Música', 'Cine', 'Deportes'],
  location: 'Buenos Aires, Argentina'
};
