const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: 'senha123'
    }
  });

  await prisma.plantas.createMany({
    data: [
      {
        nome_p: 'Manjericão',
        nome_c: 'Ocimum basilicum',
        especie: 'Lamiaceae',
        classe: 'Magnoliopsida',
        origem: 'Ásia e África',
        descricao: 'Erva aromática de folhas verdes utilizadas na culinária e medicina natural.',
        beneficios: 'Possui propriedades antioxidantes, anti-inflamatórias e auxilia na digestão.',
        img: 'https://static.vecteezy.com/system/resources/previews/022/149/272/non_2x/basil-leaf-isolated-png.png'
      },
      {
        nome_p: 'Aloe Vera',
        nome_c: 'Aloe barbadensis miller',
        especie: 'Asphodelaceae',
        classe: 'Liliopsida',
        origem: 'África',
        descricao: 'Planta suculenta usada em cosméticos e medicina natural.',
        beneficios: 'Cicatrizante, hidratante e anti-inflamatória.',
        img: 'https://png.pngtree.com/png-vector/20240221/ourmid/pngtree-aloe-vera-png-image_11868652.png'
      }
    ]
  });
}

main()
  .then(() => {
    console.log('Seed executada com sucesso!');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });