import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import { ApolloError, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

const prisma = new pc.PrismaClient();

const MESAJ_EKLENDI = "MESAJ_EKLENDI";

const resolvers = {
  Query: {
    danisanIcinDiyetisyeniniGetir: async (_, args, { kullaniciId }) => {
      const kullanici = await prisma.kullanici.findFirst({
        where: { id: kullaniciId },
      });
      if (!kullanici) throw new AuthenticationError("Böyle bişi yok.");
      const danisan = await prisma.danisan.findFirst({
        where: { id: kullanici.kullaniciId },
      });
      const diyetisyen = await prisma.diyetisyen.findFirst({
        where: { id: danisan.diyetisyenId },
      });
      return diyetisyen;
    },
    diyetisyenKullaniciIdGetirQuery: async (_, args, { kullaniciId }) => {
      const kullanici = await prisma.kullanici.findFirst({
        where: { id: kullaniciId },
      });
      if (!kullanici) throw new AuthenticationError("Böyle bişi yok.");
      const danisan = await prisma.danisan.findFirst({
        where: { id: kullanici.kullaniciId },
      });
      const diyetisyen = await prisma.diyetisyen.findFirst({
        where: { id: danisan.diyetisyenId },
      });
      const kullaniciDiyetisyen = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: diyetisyen.id,
              },
            },
            {
              kullaniciTipi: {
                equals: 2,
              },
            },
          ],
        },
      });
      return kullaniciDiyetisyen.id;
    },
    danisanKullaniciIdGetirQuery: async (_, { danisanId }) => {
      const kullanici = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: danisanId,
              },
            },
            {
              kullaniciTipi: {
                equals: 1,
              },
            },
          ],
        },
      });
      if (!kullanici) throw new AuthenticationError("Böyle bişi yok.");
      return kullanici.id;
    },
    kullaniciTipi: async (_, args, { kullaniciId }) => {
      const kullanici = await prisma.kullanici.findUnique({
        where: { id: kullaniciId },
      });

      return kullanici.kullaniciTipi;
    },
    danisanKullanicilariListele: async (_, args, { kullaniciId }) => {
      const kullanici = await prisma.kullanici.findUnique({
        where: { id: kullaniciId },
      });
      const diyetisyenId = kullanici.kullaniciId;
      const danisanlar = await prisma.danisan.findMany({
        where: { diyetisyenId: diyetisyenId },
      });
      return danisanlar;
    },
    diyetisyenKullanicilariListele: async (_, args) => {
      const diyetisyenler = await prisma.diyetisyen.findMany();
      return diyetisyenler;
    },
    mesajlariGetirDiyetisyen: async (_, { danisanId }, { kullaniciId }) => {
      if (!kullaniciId) throw new ForbiddenError("Giriş yapmalısın");
      const kullanici = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: danisanId,
              },
            },
            {
              kullaniciTipi: {
                equals: 1,
              },
            },
          ],
        },
      });
      if (!kullanici) throw new AuthenticationError("Böyle bişi yok.");

      const danisaninKullaniciTablosundakiIdsi = kullanici.id;
      const mesajlarDiyetisyenIcin = await prisma.mesaj.findMany({
        where: {
          OR: [
            {
              gondericiId: kullaniciId,
              aliciId: danisaninKullaniciTablosundakiIdsi,
            },
            {
              gondericiId: danisaninKullaniciTablosundakiIdsi,
              aliciId: kullaniciId,
            },
          ],
        },
        orderBy: {
          olusturmaTarihi: "asc",
        },
      });
      return mesajlarDiyetisyenIcin;
    },
    mesajlariGetirDanisan: async (_, args, { kullaniciId }) => {
      if (!kullaniciId) throw new ForbiddenError("Giriş yapmalısın");
      const danisanKullanici = await prisma.kullanici.findFirst({
        where: { id: kullaniciId },
      });
      const danisan = await prisma.danisan.findFirst({
        where: { id: danisanKullanici.kullaniciId },
      });
      const diyetisyenId = danisan.diyetisyenId;

      const diyetisyenKullanici = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: diyetisyenId,
              },
            },
            {
              kullaniciTipi: {
                equals: 2,
              },
            },
          ],
        },
      });
      if (!diyetisyenKullanici)
        throw new AuthenticationError("Böyle bişi yok.");

      const diyetisyeninKullaniciTablosundakiIdsi = diyetisyenKullanici.id;
      const mesajlarDanisanIcin = await prisma.mesaj.findMany({
        where: {
          OR: [
            {
              gondericiId: kullaniciId,
              aliciId: diyetisyeninKullaniciTablosundakiIdsi,
            },
            {
              gondericiId: diyetisyeninKullaniciTablosundakiIdsi,
              aliciId: kullaniciId,
            },
          ],
        },
        orderBy: {
          olusturmaTarihi: "asc",
        },
      });
      return mesajlarDanisanIcin;
    },
  },
  Mutation: {
    danisanEkle: async (_, { yeniDanisan }, { kullaniciId }) => {
      const danisan = await prisma.danisan.findUnique({
        where: { email: yeniDanisan.email },
      });
      if (danisan)
        throw new AuthenticationError(
          "Bu mail ile bir kullanıcı tanımı mevcut."
        );
      const diyetisyen = await prisma.kullanici.findUnique({
        where: { id: kullaniciId },
      });
      const diyetisyenId = diyetisyen.kullaniciId;
      const hashlenmisSifre = await bcrypt.hash(yeniDanisan.sifre, 10);
      const yeniDanisanKullanici = await prisma.danisan.create({
        data: {
          ad: yeniDanisan.ad,
          email: yeniDanisan.email,
          telefon: yeniDanisan.telefon,
          boy: parseInt(yeniDanisan.boy),
          kilo: parseInt(yeniDanisan.kilo),
          yas: parseInt(yeniDanisan.yas),
          cinsiyet: yeniDanisan.cinsiyet,
          sifre: hashlenmisSifre,
          diyetisyenId: diyetisyenId,
        },
      });
      const yeniDanisanId = await prisma.danisan.findUnique({
        where: { email: yeniDanisan.email },
      });
      await prisma.kullanici.create({
        data: {
          email: yeniDanisan.email,
          sifre: hashlenmisSifre,
          kullaniciTipi: 1,
          kullaniciId: yeniDanisanId.id,
        },
      });

      return yeniDanisanKullanici;
    },
    diyetisyenEkle: async (_, { yeniDiyetisyen }) => {
      const diyetisyen = await prisma.diyetisyen.findUnique({
        where: { email: yeniDiyetisyen.email },
      });
      if (diyetisyen)
        throw new AuthenticationError(
          "Bu mail ile bir kullanıcı tanımı mevcut."
        );
      //const diyetisyen = await prisma.kullanici.findUnique({where:{id:kullaniciId}})
      //const diyetisyenId = diyetisyen.kullaniciId
      const hashlenmisSifre = await bcrypt.hash(yeniDiyetisyen.sifre, 10);
      const yeniDiyetisyenKullanici = await prisma.diyetisyen.create({
        data: {
          // ad:yeniDiyetisyen.ad,
          // email:yeniDiyetisyen.email,
          // telefon:yeniDiyetisyen.telefon,
          ...yeniDiyetisyen,
          sifre: hashlenmisSifre,
        },
      });
      const yeniDiyetisyenId = await prisma.diyetisyen.findUnique({
        where: { email: yeniDiyetisyen.email },
      });
      await prisma.kullanici.create({
        data: {
          email: yeniDiyetisyen.email,
          sifre: hashlenmisSifre,
          kullaniciTipi: 2,
          kullaniciId: yeniDiyetisyenId.id,
        },
      });

      return yeniDiyetisyenKullanici;
    },
    KullaniciGirisYap: async (_, { kullaniciGiris }) => {
      const kullanici = await prisma.Kullanici.findUnique({
        where: { email: kullaniciGiris.email },
      });
      if (!kullanici)
        throw new AuthenticationError(
          "Bu email ile tanımlı bir kullanıcı yok."
        );
      const eslestiMi = await bcrypt.compare(
        kullaniciGiris.sifre,
        kullanici.sifre
      );
      if (!eslestiMi)
        throw new AuthenticationError("email veya şifre geçersiz");
      const token = jwt.sign(
        { kullaniciId: kullanici.id },
        process.env.JWT_SECRET
      );
      // const token={
      //     token:jwt.sign({kullaniciId:kullanici.id},process.env.JWT_SECRET),
      //     kullaniciTipi:kullanici.kullaniciTipi
      // }
      return { token };
    },
    kullaniciTipiGetir: async (_, { kullaniciGiris2 }) => {
      const kullanici = await prisma.kullanici.findUnique({
        where: { email: kullaniciGiris2.email },
      });
      if (!kullanici)
        throw new AuthenticationError(
          "Bu email ile tanımlı bir kullanıcı yok."
        );
      const eslestiMi = await bcrypt.compare(
        kullaniciGiris2.sifre,
        kullanici.sifre
      );
      if (!eslestiMi)
        throw new AuthenticationError("email veya şifre geçersiz");
      const kullaniciTipi = {
        kullaniciTipi: kullanici.kullaniciTipi,
      };
      return kullaniciTipi;
    },
    danisanKullaniciIdGetir: async (_, { danisanId }) => {
      const kullanici = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: danisanId,
              },
            },
            {
              kullaniciTipi: {
                equals: 1,
              },
            },
          ],
        },
      });
      if (!kullanici) throw new AuthenticationError("Böyle bişi yok.");
      const kullaniciId = {
        kullaniciId: kullanici.id,
        danisanId: danisanId,
      };
      return kullaniciId;
    },
    mesajEkle: async (_, { aliciId, metin }, { kullaniciId }) => {
      if (!kullaniciId) throw new ApolloError("Öncelikle giriş yapmalısın!");
      const mesaj = await prisma.mesaj.create({
        data: {
          metin,
          aliciId,
          gondericiId: kullaniciId,
        },
      });
      pubsub.publish(MESAJ_EKLENDI, { mesajEklendi: mesaj });
      return mesaj;
    },
    danisanSil: async (_, { silinecekDanisanId }) => {
      const danisan = await prisma.danisan.findFirst({
        where: { id: silinecekDanisanId },
      });
      const kullaniciDanisan = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: danisan.id,
              },
            },
            {
              kullaniciTipi: {
                equals: 1,
              },
            },
          ],
        },
      });

      const deleteMesajlar = await prisma.mesaj.deleteMany({
        where: {
          OR: [
            {
              aliciId: {
                equals: kullaniciDanisan.id,
              },
            },
            {
              gondericiId: {
                equals: kullaniciDanisan.id,
              },
            },
          ],
          //aliciId: kullaniciDanisan.id,
        },
      });

      const deleteUser = await prisma.danisan.delete({
        where: {
          id: silinecekDanisanId,
        },
      });

      const deleteUser2 = await prisma.kullanici.delete({
        where: {
          id: kullaniciDanisan.id,
        },
      });

      return 1;
    },
    diyetisyenSil: async (_, { silinecekDiyetisyenEmail }) => {
      const diyetisyen = await prisma.diyetisyen.findUnique({
        where: { email: silinecekDiyetisyenEmail },
      });

      const diyetisyeninDanisaniVarMi = await prisma.danisan.findFirst({
        where: { diyetisyenId: diyetisyen.id },
      });

      if (diyetisyeninDanisaniVarMi)
        throw new ApolloError(
          "Öncelikle diyetisyenin danışanları silinmelidir."
        );

      const kullaniciDiyetisyen = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: diyetisyen.id,
              },
            },
            {
              kullaniciTipi: {
                equals: 2,
              },
            },
          ],
        },
      });

      const deleteMesajlar = await prisma.mesaj.deleteMany({
        where: {
          OR: [
            {
              aliciId: {
                equals: kullaniciDiyetisyen.id,
              },
            },
            {
              gondericiId: {
                equals: kullaniciDiyetisyen.id,
              },
            },
          ],
        },
      });

      const deleteUser = await prisma.diyetisyen.delete({
        where: {
          email: silinecekDiyetisyenEmail,
        },
      });

      const deleteUser2 = await prisma.kullanici.delete({
        where: {
          id: kullaniciDiyetisyen.id,
        },
      });

      return 1;
    },
    sifreDegistir: async (_, { sifreSifirlama }) => {
      const kullanici = await prisma.Kullanici.findUnique({
        where: { email: sifreSifirlama.email },
      });
      if (!kullanici)
        throw new AuthenticationError(
          "Bu email ile tanımlı bir kullanıcı yok."
        );

      if (sifreSifirlama.yeniSifre != sifreSifirlama.yeniSifreTekrar) {
        throw new AuthenticationError("Şifreleri aynı girmelisiniz.");
      }

      const hashlenmisSifre = await bcrypt.hash(sifreSifirlama.yeniSifre, 10);

      const updateUser = await prisma.kullanici.update({
        where: {
          email: sifreSifirlama.email,
        },
        data: {
          sifre: hashlenmisSifre,
        },
      })

      return sifreSifirlama.yeniSifre;
    },
    danisanGuncelle: async (_, { danisanEmail, guncellenecekDanisan }) => {
      const danisan = await prisma.danisan.findUnique({
        where: { email: danisanEmail },
      });
      const updateDanisan = await prisma.danisan.update({
        where: {
          email: danisanEmail
        },
        data: {
          ad: guncellenecekDanisan.ad,
          email: guncellenecekDanisan.email,
          telefon: guncellenecekDanisan.telefon,
          yas: guncellenecekDanisan.yas,
          boy: guncellenecekDanisan.boy,
        },
      })

      const danisanKullanici = await prisma.kullanici.findFirst({
        where: {
          AND: [
            {
              kullaniciId: {
                equals: danisan.id,
              },
            },
            {
              kullaniciTipi: {
                equals: 1,
              },
            },
          ],
        }
      });

      const updateDanisanKullanici = await prisma.kullanici.update({
        where: {
          id: danisanKullanici.id
        },
        data: {
          email:guncellenecekDanisan.email
        },
      });

      return 1;
    },
    // diyetisyenGuncelle: async (_, { diyetisyenEmail }) => {
    //   const diyetisyen = await prisma.diyetisyen.findUnique({
    //     where: { email: diyetisyenEmail },
    //   });

    //   const kullaniciDiyetisyen = await prisma.kullanici.findFirst({
    //     where: {
    //       AND: [
    //         {
    //           kullaniciId: {
    //             equals: diyetisyen.id,
    //           },
    //         },
    //         {
    //           kullaniciTipi: {
    //             equals: 2,
    //           },
    //         },
    //       ],
    //     },
    //   });

    //   const deleteMesajlar = await prisma.mesaj.deleteMany({
    //     where: {
    //       OR: [
    //         {
    //           aliciId: {
    //             equals: kullaniciDiyetisyen.id,
    //           },
    //         },
    //         {
    //           gondericiId: {
    //             equals: kullaniciDiyetisyen.id,
    //           },
    //         },
    //       ],
    //     },
    //   });

    //   const deleteUser = await prisma.diyetisyen.delete({
    //     where: {
    //       email: silinecekDiyetisyenEmail,
    //     },
    //   });

    //   const deleteUser2 = await prisma.kullanici.delete({
    //     where: {
    //       id: kullaniciDiyetisyen.id,
    //     },
    //   });

    //   return 1;
    // },
  },
  Subscription: {
    mesajEklendi: {
      subscribe: () => pubsub.asyncIterator(MESAJ_EKLENDI),
    },
  },
};
// const token = {
//     Token: {
//       token: (user) => user.token.BOOL,
//       kullaniciTipi: (user) => user.kullaniciTipi.S,
//       // and so on
//     }
//   }
// Token: {
//     token: (x) => x.token.S,
//     kullaniciTipi: (x) => x.kullaniciTipi.I,
//     // and so on
//   }

export default resolvers;
