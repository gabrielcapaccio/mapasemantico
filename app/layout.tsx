export const metadata = {
  title: 'Mapa de Calor Semántico',
  description: 'Analiza la importancia semántica de las palabras en un texto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
