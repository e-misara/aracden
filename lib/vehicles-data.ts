export interface Kasa {
  kod: string;
  yillar: [number, number];
}

export interface Model {
  ad: string;
  kasalar: Kasa[];
}

export interface Marka {
  ad: string;
  modeller: Model[];
}

export interface Kategori {
  slug: string;
  ad: string;
  emoji: string;
  markalar: Marka[];
}

export const KATEGORILER: Kategori[] = [
  {
    slug: "otomobil",
    ad: "Otomobil",
    emoji: "🚗",
    markalar: [
      {
        ad: "BMW",
        modeller: [
          {
            ad: "1 Serisi",
            kasalar: [
              { kod: "E87", yillar: [2004, 2011] },
              { kod: "F20", yillar: [2011, 2019] },
              { kod: "F40", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "2 Serisi",
            kasalar: [
              { kod: "F22", yillar: [2014, 2021] },
              { kod: "G42", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "3 Serisi",
            kasalar: [
              { kod: "E36", yillar: [1990, 2000] },
              { kod: "E46", yillar: [1998, 2006] },
              { kod: "E90", yillar: [2005, 2012] },
              { kod: "F30", yillar: [2012, 2018] },
              { kod: "G20", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "4 Serisi",
            kasalar: [
              { kod: "F32", yillar: [2013, 2020] },
              { kod: "G22", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "5 Serisi",
            kasalar: [
              { kod: "E39", yillar: [1995, 2003] },
              { kod: "E60", yillar: [2003, 2010] },
              { kod: "F10", yillar: [2010, 2017] },
              { kod: "G30", yillar: [2017, 2024] },
              { kod: "G60", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "7 Serisi",
            kasalar: [
              { kod: "E38", yillar: [1994, 2001] },
              { kod: "E65", yillar: [2001, 2008] },
              { kod: "F01", yillar: [2008, 2015] },
              { kod: "G11", yillar: [2015, 2022] },
              { kod: "G70", yillar: [2022, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Mercedes-Benz",
        modeller: [
          {
            ad: "A Serisi",
            kasalar: [
              { kod: "W168", yillar: [1997, 2004] },
              { kod: "W169", yillar: [2004, 2012] },
              { kod: "W176", yillar: [2012, 2018] },
              { kod: "W177", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "B Serisi",
            kasalar: [
              { kod: "W245", yillar: [2005, 2011] },
              { kod: "W246", yillar: [2011, 2018] },
              { kod: "W247", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "C Serisi",
            kasalar: [
              { kod: "W202", yillar: [1993, 2000] },
              { kod: "W203", yillar: [2000, 2007] },
              { kod: "W204", yillar: [2007, 2014] },
              { kod: "W205", yillar: [2014, 2021] },
              { kod: "W206", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "E Serisi",
            kasalar: [
              { kod: "W210", yillar: [1995, 2002] },
              { kod: "W211", yillar: [2002, 2009] },
              { kod: "W212", yillar: [2009, 2016] },
              { kod: "W213", yillar: [2016, 2024] },
              { kod: "W214", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "S Serisi",
            kasalar: [
              { kod: "W140", yillar: [1991, 1998] },
              { kod: "W220", yillar: [1998, 2005] },
              { kod: "W221", yillar: [2005, 2013] },
              { kod: "W222", yillar: [2013, 2020] },
              { kod: "W223", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Audi",
        modeller: [
          {
            ad: "A3",
            kasalar: [
              { kod: "8L", yillar: [1996, 2003] },
              { kod: "8P", yillar: [2003, 2012] },
              { kod: "8V", yillar: [2012, 2020] },
              { kod: "8Y", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "A4",
            kasalar: [
              { kod: "B5", yillar: [1994, 2001] },
              { kod: "B6", yillar: [2001, 2005] },
              { kod: "B7", yillar: [2004, 2008] },
              { kod: "B8", yillar: [2008, 2016] },
              { kod: "B9", yillar: [2016, 2024] },
              { kod: "B10", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "A6",
            kasalar: [
              { kod: "C5", yillar: [1997, 2004] },
              { kod: "C6", yillar: [2004, 2011] },
              { kod: "C7", yillar: [2011, 2018] },
              { kod: "C8", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "A5",
            kasalar: [
              { kod: "8T", yillar: [2007, 2016] },
              { kod: "F5", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "A1",
            kasalar: [
              { kod: "8X", yillar: [2010, 2018] },
              { kod: "GB", yillar: [2018, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Volkswagen",
        modeller: [
          {
            ad: "Golf",
            kasalar: [
              { kod: "Mk3", yillar: [1991, 1997] },
              { kod: "Mk4", yillar: [1997, 2003] },
              { kod: "Mk5", yillar: [2003, 2008] },
              { kod: "Mk6", yillar: [2008, 2012] },
              { kod: "Mk7", yillar: [2012, 2019] },
              { kod: "Mk8", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Passat",
            kasalar: [
              { kod: "B5", yillar: [1996, 2005] },
              { kod: "B6", yillar: [2005, 2010] },
              { kod: "B7", yillar: [2010, 2014] },
              { kod: "B8", yillar: [2014, 2023] },
              { kod: "B9", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "Polo",
            kasalar: [
              { kod: "Mk3", yillar: [1994, 2001] },
              { kod: "Mk4", yillar: [2001, 2009] },
              { kod: "Mk5", yillar: [2009, 2017] },
              { kod: "Mk6", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Jetta",
            kasalar: [
              { kod: "Mk4", yillar: [1999, 2005] },
              { kod: "Mk5", yillar: [2005, 2010] },
              { kod: "Mk6", yillar: [2010, 2018] },
              { kod: "Mk7", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Bora",
            kasalar: [
              { kod: "1J", yillar: [1998, 2005] },
            ],
          },
        ],
      },
      {
        ad: "Toyota",
        modeller: [
          {
            ad: "Corolla",
            kasalar: [
              { kod: "E100", yillar: [1991, 1997] },
              { kod: "E110", yillar: [1995, 2002] },
              { kod: "E120", yillar: [2000, 2006] },
              { kod: "E140/E150", yillar: [2006, 2013] },
              { kod: "E170", yillar: [2013, 2019] },
              { kod: "E210", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Yaris",
            kasalar: [
              { kod: "P10", yillar: [1999, 2005] },
              { kod: "P90", yillar: [2005, 2011] },
              { kod: "P130", yillar: [2011, 2020] },
              { kod: "P210", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Auris",
            kasalar: [
              { kod: "E150", yillar: [2006, 2012] },
              { kod: "E180", yillar: [2012, 2019] },
            ],
          },
          {
            ad: "Camry",
            kasalar: [
              { kod: "XV40", yillar: [2006, 2011] },
              { kod: "XV50", yillar: [2011, 2017] },
              { kod: "XV70", yillar: [2017, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Renault",
        modeller: [
          {
            ad: "Megane",
            kasalar: [
              { kod: "1.Nesil", yillar: [1995, 2002] },
              { kod: "2.Nesil", yillar: [2002, 2008] },
              { kod: "3.Nesil", yillar: [2008, 2016] },
              { kod: "4.Nesil", yillar: [2016, 2023] },
            ],
          },
          {
            ad: "Clio",
            kasalar: [
              { kod: "Mk1", yillar: [1990, 1998] },
              { kod: "Mk2", yillar: [1998, 2005] },
              { kod: "Mk3", yillar: [2005, 2012] },
              { kod: "Mk4", yillar: [2012, 2019] },
              { kod: "Mk5", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Symbol",
            kasalar: [
              { kod: "1.Nesil", yillar: [1999, 2008] },
              { kod: "2.Nesil", yillar: [2008, 2012] },
              { kod: "3.Nesil", yillar: [2012, 2021] },
            ],
          },
          {
            ad: "Fluence",
            kasalar: [
              { kod: "L30", yillar: [2009, 2016] },
            ],
          },
          {
            ad: "Talisman",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2022] },
            ],
          },
          {
            ad: "Laguna",
            kasalar: [
              { kod: "X56", yillar: [1993, 2001] },
              { kod: "X74", yillar: [2001, 2007] },
              { kod: "X91", yillar: [2007, 2015] },
            ],
          },
        ],
      },
      {
        ad: "Ford",
        modeller: [
          {
            ad: "Focus",
            kasalar: [
              { kod: "Mk1", yillar: [1998, 2004] },
              { kod: "Mk2", yillar: [2004, 2011] },
              { kod: "Mk3", yillar: [2011, 2018] },
              { kod: "Mk4", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Mondeo",
            kasalar: [
              { kod: "Mk1", yillar: [1993, 1996] },
              { kod: "Mk2", yillar: [1996, 2000] },
              { kod: "Mk3", yillar: [2000, 2007] },
              { kod: "Mk4", yillar: [2007, 2014] },
              { kod: "Mk5", yillar: [2014, 2022] },
            ],
          },
          {
            ad: "Fiesta",
            kasalar: [
              { kod: "Mk5", yillar: [2001, 2008] },
              { kod: "Mk6", yillar: [2008, 2017] },
              { kod: "Mk7", yillar: [2017, 2023] },
            ],
          },
          {
            ad: "Fusion",
            kasalar: [
              { kod: "Mk1", yillar: [2002, 2012] },
            ],
          },
        ],
      },
      {
        ad: "Fiat",
        modeller: [
          {
            ad: "Egea",
            kasalar: [
              { kod: "356", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "Linea",
            kasalar: [
              { kod: "323", yillar: [2006, 2015] },
            ],
          },
          {
            ad: "Tipo",
            kasalar: [
              { kod: "1.Nesil", yillar: [1988, 1995] },
              { kod: "2.Nesil", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "Punto",
            kasalar: [
              { kod: "188", yillar: [1999, 2010] },
              { kod: "199", yillar: [2005, 2018] },
            ],
          },
          {
            ad: "Bravo",
            kasalar: [
              { kod: "182", yillar: [1995, 2001] },
              { kod: "198", yillar: [2007, 2014] },
            ],
          },
          {
            ad: "Stilo",
            kasalar: [
              { kod: "192", yillar: [2001, 2007] },
            ],
          },
        ],
      },
      {
        ad: "Hyundai",
        modeller: [
          {
            ad: "i20",
            kasalar: [
              { kod: "PB", yillar: [2008, 2015] },
              { kod: "GB", yillar: [2014, 2020] },
              { kod: "BC3", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "i30",
            kasalar: [
              { kod: "FD", yillar: [2007, 2012] },
              { kod: "GD", yillar: [2011, 2017] },
              { kod: "PD", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Elantra",
            kasalar: [
              { kod: "XD", yillar: [2000, 2006] },
              { kod: "HD", yillar: [2006, 2010] },
              { kod: "MD", yillar: [2010, 2016] },
              { kod: "AD", yillar: [2015, 2020] },
              { kod: "CN7", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Accent",
            kasalar: [
              { kod: "LC", yillar: [1999, 2005] },
              { kod: "MC", yillar: [2005, 2010] },
              { kod: "RB", yillar: [2010, 2017] },
            ],
          },
          {
            ad: "Sonata",
            kasalar: [
              { kod: "EF", yillar: [1998, 2005] },
              { kod: "NF", yillar: [2005, 2010] },
              { kod: "YF", yillar: [2010, 2014] },
              { kod: "LF", yillar: [2014, 2019] },
              { kod: "DN8", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Kia",
        modeller: [
          {
            ad: "Cerato",
            kasalar: [
              { kod: "LD", yillar: [2003, 2009] },
              { kod: "TD", yillar: [2008, 2013] },
              { kod: "YD", yillar: [2013, 2018] },
              { kod: "BD", yillar: [2018, 2023] },
            ],
          },
          {
            ad: "Picanto",
            kasalar: [
              { kod: "SA", yillar: [2003, 2011] },
              { kod: "TA", yillar: [2011, 2017] },
              { kod: "JA", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Rio",
            kasalar: [
              { kod: "DC", yillar: [2000, 2005] },
              { kod: "JB", yillar: [2005, 2011] },
              { kod: "UB", yillar: [2011, 2017] },
              { kod: "YB", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Stinger",
            kasalar: [
              { kod: "CK", yillar: [2017, 2023] },
            ],
          },
        ],
      },
      {
        ad: "Skoda",
        modeller: [
          {
            ad: "Octavia",
            kasalar: [
              { kod: "1U", yillar: [1996, 2010] },
              { kod: "1Z", yillar: [2004, 2013] },
              { kod: "5E", yillar: [2012, 2019] },
              { kod: "NX", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Fabia",
            kasalar: [
              { kod: "6Y", yillar: [1999, 2007] },
              { kod: "5J", yillar: [2007, 2014] },
              { kod: "NJ", yillar: [2014, 2021] },
              { kod: "PJ", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Superb",
            kasalar: [
              { kod: "3U", yillar: [2001, 2008] },
              { kod: "3T", yillar: [2008, 2015] },
              { kod: "3V", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "Rapid",
            kasalar: [
              { kod: "NH", yillar: [2012, 2019] },
            ],
          },
        ],
      },
      {
        ad: "Dacia",
        modeller: [
          {
            ad: "Logan",
            kasalar: [
              { kod: "1.Nesil", yillar: [2004, 2012] },
              { kod: "2.Nesil", yillar: [2012, 2020] },
              { kod: "3.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Sandero",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2012] },
              { kod: "2.Nesil", yillar: [2012, 2020] },
              { kod: "3.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Duster",
            kasalar: [
              { kod: "1.Nesil", yillar: [2010, 2017] },
              { kod: "2.Nesil", yillar: [2017, 2023] },
              { kod: "3.Nesil", yillar: [2023, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Opel",
        modeller: [
          {
            ad: "Astra",
            kasalar: [
              { kod: "F", yillar: [1991, 1998] },
              { kod: "G", yillar: [1998, 2004] },
              { kod: "H", yillar: [2004, 2009] },
              { kod: "J", yillar: [2009, 2015] },
              { kod: "K", yillar: [2015, 2021] },
              { kod: "L", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Corsa",
            kasalar: [
              { kod: "B", yillar: [1993, 2000] },
              { kod: "C", yillar: [2000, 2006] },
              { kod: "D", yillar: [2006, 2014] },
              { kod: "E", yillar: [2014, 2019] },
              { kod: "F", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Vectra",
            kasalar: [
              { kod: "B", yillar: [1995, 2002] },
              { kod: "C", yillar: [2002, 2008] },
            ],
          },
          {
            ad: "Insignia",
            kasalar: [
              { kod: "A", yillar: [2008, 2017] },
              { kod: "B", yillar: [2017, 2024] },
            ],
          },
          {
            ad: "Zafira",
            kasalar: [
              { kod: "A", yillar: [1999, 2005] },
              { kod: "B", yillar: [2005, 2014] },
            ],
          },
        ],
      },
      {
        ad: "Peugeot",
        modeller: [
          {
            ad: "206",
            kasalar: [
              { kod: "2A/C", yillar: [1998, 2012] },
            ],
          },
          {
            ad: "207",
            kasalar: [
              { kod: "WA/WC", yillar: [2006, 2014] },
            ],
          },
          {
            ad: "208",
            kasalar: [
              { kod: "1.Nesil", yillar: [2012, 2019] },
              { kod: "2.Nesil", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "301",
            kasalar: [
              { kod: "1.Nesil", yillar: [2012, 2021] },
            ],
          },
          {
            ad: "308",
            kasalar: [
              { kod: "T7", yillar: [2007, 2013] },
              { kod: "T9", yillar: [2013, 2021] },
              { kod: "P51", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "407",
            kasalar: [
              { kod: "6D", yillar: [2004, 2011] },
            ],
          },
          {
            ad: "508",
            kasalar: [
              { kod: "1.Nesil", yillar: [2010, 2018] },
              { kod: "2.Nesil", yillar: [2018, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Citroën",
        modeller: [
          {
            ad: "C3",
            kasalar: [
              { kod: "1.Nesil", yillar: [2001, 2009] },
              { kod: "2.Nesil", yillar: [2009, 2016] },
              { kod: "3.Nesil", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "C4",
            kasalar: [
              { kod: "B7", yillar: [2004, 2010] },
              { kod: "B71", yillar: [2010, 2018] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "C5",
            kasalar: [
              { kod: "X3", yillar: [2001, 2008] },
              { kod: "RD/TD", yillar: [2008, 2017] },
            ],
          },
          {
            ad: "Xsara Picasso",
            kasalar: [
              { kod: "N68", yillar: [1999, 2010] },
            ],
          },
        ],
      },
      {
        ad: "Honda",
        modeller: [
          {
            ad: "Civic",
            kasalar: [
              { kod: "EK/6.Nesil", yillar: [1995, 2000] },
              { kod: "EP/7.Nesil", yillar: [2000, 2005] },
              { kod: "FD/8.Nesil", yillar: [2005, 2012] },
              { kod: "FB/9.Nesil", yillar: [2011, 2015] },
              { kod: "FC/10.Nesil", yillar: [2015, 2021] },
              { kod: "FE/11.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Accord",
            kasalar: [
              { kod: "CG/6.Nesil", yillar: [1997, 2002] },
              { kod: "CL/7.Nesil", yillar: [2002, 2008] },
              { kod: "CP/8.Nesil", yillar: [2008, 2015] },
              { kod: "CV/10.Nesil", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "City",
            kasalar: [
              { kod: "4.Nesil", yillar: [2002, 2008] },
              { kod: "5.Nesil", yillar: [2008, 2014] },
              { kod: "6.Nesil", yillar: [2014, 2020] },
              { kod: "7.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Jazz",
            kasalar: [
              { kod: "GD", yillar: [2001, 2008] },
              { kod: "GE", yillar: [2008, 2015] },
              { kod: "GK", yillar: [2015, 2020] },
              { kod: "GR", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Nissan",
        modeller: [
          {
            ad: "Micra",
            kasalar: [
              { kod: "K11", yillar: [1992, 2002] },
              { kod: "K12", yillar: [2002, 2010] },
              { kod: "K13", yillar: [2010, 2016] },
              { kod: "K14", yillar: [2017, 2022] },
            ],
          },
          {
            ad: "Almera",
            kasalar: [
              { kod: "N15", yillar: [1995, 2000] },
              { kod: "N16", yillar: [2000, 2006] },
            ],
          },
          {
            ad: "Primera",
            kasalar: [
              { kod: "P10", yillar: [1990, 1996] },
              { kod: "P11", yillar: [1996, 2002] },
              { kod: "P12", yillar: [2002, 2007] },
            ],
          },
          {
            ad: "Maxima",
            kasalar: [
              { kod: "A33", yillar: [2000, 2008] },
            ],
          },
        ],
      },
      {
        ad: "Mazda",
        modeller: [
          {
            ad: "3",
            kasalar: [
              { kod: "BK", yillar: [2003, 2009] },
              { kod: "BL", yillar: [2009, 2013] },
              { kod: "BM", yillar: [2013, 2019] },
              { kod: "BP", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "6",
            kasalar: [
              { kod: "GG", yillar: [2002, 2007] },
              { kod: "GH", yillar: [2007, 2013] },
              { kod: "GJ", yillar: [2012, 2025] },
            ],
          },
          {
            ad: "2",
            kasalar: [
              { kod: "DE", yillar: [2007, 2014] },
              { kod: "DJ", yillar: [2014, 2022] },
            ],
          },
        ],
      },
      {
        ad: "Mitsubishi",
        modeller: [
          {
            ad: "Lancer",
            kasalar: [
              { kod: "CK/CL", yillar: [1996, 2003] },
              { kod: "CS", yillar: [2003, 2007] },
              { kod: "CY", yillar: [2007, 2017] },
            ],
          },
          {
            ad: "Carisma",
            kasalar: [
              { kod: "DA", yillar: [1995, 2004] },
            ],
          },
          {
            ad: "Galant",
            kasalar: [
              { kod: "EA", yillar: [1996, 2004] },
            ],
          },
          {
            ad: "Colt",
            kasalar: [
              { kod: "Z30", yillar: [2002, 2012] },
            ],
          },
        ],
      },
      {
        ad: "Volvo",
        modeller: [
          {
            ad: "S40",
            kasalar: [
              { kod: "V/N", yillar: [1995, 2004] },
              { kod: "MS", yillar: [2003, 2012] },
            ],
          },
          {
            ad: "S60",
            kasalar: [
              { kod: "1.Nesil", yillar: [2000, 2009] },
              { kod: "2.Nesil", yillar: [2010, 2018] },
              { kod: "3.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "S80",
            kasalar: [
              { kod: "1.Nesil", yillar: [1998, 2006] },
              { kod: "2.Nesil", yillar: [2006, 2016] },
            ],
          },
          {
            ad: "V40",
            kasalar: [
              { kod: "525/526", yillar: [2012, 2019] },
            ],
          },
        ],
      },
      {
        ad: "SEAT",
        modeller: [
          {
            ad: "Leon",
            kasalar: [
              { kod: "1M", yillar: [1999, 2005] },
              { kod: "1P", yillar: [2005, 2012] },
              { kod: "5F", yillar: [2012, 2020] },
              { kod: "KL", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Ibiza",
            kasalar: [
              { kod: "Mk2", yillar: [1993, 1999] },
              { kod: "Mk3", yillar: [2002, 2008] },
              { kod: "Mk4", yillar: [2008, 2017] },
              { kod: "Mk5", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Toledo",
            kasalar: [
              { kod: "1M", yillar: [1998, 2004] },
              { kod: "5P", yillar: [2004, 2009] },
              { kod: "NH", yillar: [2012, 2019] },
            ],
          },
          {
            ad: "Cordoba",
            kasalar: [
              { kod: "6K", yillar: [1999, 2003] },
              { kod: "6L", yillar: [2002, 2009] },
            ],
          },
        ],
      },
      {
        ad: "Subaru",
        modeller: [
          {
            ad: "Impreza",
            kasalar: [
              { kod: "GC/GF", yillar: [1992, 2000] },
              { kod: "GD/GG", yillar: [2000, 2007] },
              { kod: "GE/GH", yillar: [2007, 2011] },
              { kod: "GP/GJ", yillar: [2011, 2016] },
              { kod: "GT", yillar: [2016, 2023] },
            ],
          },
          {
            ad: "Legacy",
            kasalar: [
              { kod: "BD/BG", yillar: [1993, 1998] },
              { kod: "BE/BH", yillar: [1998, 2003] },
              { kod: "BL/BP", yillar: [2003, 2009] },
              { kod: "BM/BR", yillar: [2009, 2014] },
              { kod: "BS", yillar: [2014, 2019] },
            ],
          },
        ],
      },
      {
        ad: "Suzuki",
        modeller: [
          {
            ad: "Swift",
            kasalar: [
              { kod: "SF/AH", yillar: [1989, 2004] },
              { kod: "RS", yillar: [2004, 2010] },
              { kod: "FZ/NZ", yillar: [2010, 2017] },
              { kod: "AZ", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Baleno",
            kasalar: [
              { kod: "1.Nesil", yillar: [1995, 2002] },
              { kod: "2.Nesil", yillar: [2015, 2022] },
              { kod: "3.Nesil", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Liana",
            kasalar: [
              { kod: "ER/RH", yillar: [2001, 2007] },
            ],
          },
        ],
      },
      {
        ad: "TOGG",
        modeller: [
          {
            ad: "T10X",
            kasalar: [
              { kod: "1.Nesil", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "T10F",
            kasalar: [
              { kod: "1.Nesil", yillar: [2024, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Alfa Romeo",
        modeller: [
          {
            ad: "147",
            kasalar: [
              { kod: "937", yillar: [2000, 2010] },
            ],
          },
          {
            ad: "156",
            kasalar: [
              { kod: "932", yillar: [1997, 2007] },
            ],
          },
          {
            ad: "159",
            kasalar: [
              { kod: "939", yillar: [2005, 2011] },
            ],
          },
          {
            ad: "Giulia",
            kasalar: [
              { kod: "952", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Giulietta",
            kasalar: [
              { kod: "940", yillar: [2010, 2020] },
            ],
          },
        ],
      },
      {
        ad: "Mini",
        modeller: [
          {
            ad: "Cooper",
            kasalar: [
              { kod: "R50/R53", yillar: [2001, 2006] },
              { kod: "R56", yillar: [2006, 2013] },
              { kod: "F56", yillar: [2014, 2023] },
              { kod: "J01", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "Clubman",
            kasalar: [
              { kod: "R55", yillar: [2007, 2014] },
              { kod: "F54", yillar: [2015, 2023] },
            ],
          },
        ],
      },
      {
        ad: "Jeep",
        modeller: [
          {
            ad: "Renegade",
            kasalar: [
              { kod: "BU", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Compass",
            kasalar: [
              { kod: "MK49", yillar: [2006, 2016] },
              { kod: "MP521", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Cherokee",
            kasalar: [
              { kod: "XJ", yillar: [1984, 2001] },
              { kod: "KJ", yillar: [2001, 2007] },
              { kod: "KK", yillar: [2007, 2013] },
              { kod: "KL", yillar: [2013, 2023] },
            ],
          },
        ],
      },
      {
        ad: "Land Rover",
        modeller: [
          {
            ad: "Freelander",
            kasalar: [
              { kod: "L314", yillar: [1997, 2006] },
              { kod: "L359", yillar: [2006, 2014] },
            ],
          },
          {
            ad: "Discovery Sport",
            kasalar: [
              { kod: "L550", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Range Rover Evoque",
            kasalar: [
              { kod: "L538", yillar: [2011, 2019] },
              { kod: "L551", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Porsche",
        modeller: [
          {
            ad: "911",
            kasalar: [
              { kod: "996", yillar: [1997, 2004] },
              { kod: "997", yillar: [2004, 2012] },
              { kod: "991", yillar: [2011, 2019] },
              { kod: "992", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Cayenne",
            kasalar: [
              { kod: "9PA", yillar: [2002, 2010] },
              { kod: "92A", yillar: [2010, 2018] },
              { kod: "9YA", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Panamera",
            kasalar: [
              { kod: "970", yillar: [2009, 2016] },
              { kod: "971", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Chevrolet",
        modeller: [
          {
            ad: "Cruze",
            kasalar: [
              { kod: "J300", yillar: [2009, 2015] },
              { kod: "J400", yillar: [2015, 2019] },
            ],
          },
          {
            ad: "Aveo",
            kasalar: [
              { kod: "T250", yillar: [2006, 2012] },
              { kod: "T300", yillar: [2011, 2017] },
            ],
          },
          {
            ad: "Spark",
            kasalar: [
              { kod: "M200", yillar: [2005, 2010] },
              { kod: "M300", yillar: [2010, 2015] },
              { kod: "M400", yillar: [2015, 2021] },
            ],
          },
          {
            ad: "Captiva",
            kasalar: [
              { kod: "C100", yillar: [2006, 2011] },
              { kod: "C140", yillar: [2011, 2018] },
            ],
          },
        ],
      },
      {
        ad: "Lexus",
        modeller: [
          {
            ad: "IS",
            kasalar: [
              { kod: "XE10", yillar: [1998, 2005] },
              { kod: "XE20", yillar: [2005, 2013] },
              { kod: "XE30", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "ES",
            kasalar: [
              { kod: "XV40", yillar: [2006, 2012] },
              { kod: "XV60", yillar: [2012, 2018] },
              { kod: "XV70", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "CT",
            kasalar: [
              { kod: "ZWA10", yillar: [2010, 2020] },
            ],
          },
        ],
      },
      {
        ad: "Infiniti",
        modeller: [
          {
            ad: "Q50",
            kasalar: [
              { kod: "V37", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "G Serisi",
            kasalar: [
              { kod: "V35", yillar: [2002, 2006] },
              { kod: "V36", yillar: [2006, 2013] },
            ],
          },
        ],
      },
      {
        ad: "Chery",
        modeller: [
          {
            ad: "Tiggo 8 Pro",
            kasalar: [
              { kod: "1.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Tiggo 7 Pro",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Arrizo 5",
            kasalar: [
              { kod: "1.Nesil", yillar: [2022, 2025] },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "arazi-suv",
    ad: "Arazi & SUV",
    emoji: "🚙",
    markalar: [
      {
        ad: "BMW",
        modeller: [
          {
            ad: "X1",
            kasalar: [
              { kod: "E84", yillar: [2009, 2015] },
              { kod: "F48", yillar: [2015, 2022] },
              { kod: "U11", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "X3",
            kasalar: [
              { kod: "E83", yillar: [2003, 2010] },
              { kod: "F25", yillar: [2010, 2017] },
              { kod: "G01", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "X5",
            kasalar: [
              { kod: "E53", yillar: [1999, 2006] },
              { kod: "E70", yillar: [2006, 2013] },
              { kod: "F15", yillar: [2013, 2018] },
              { kod: "G05", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "X6",
            kasalar: [
              { kod: "E71", yillar: [2008, 2014] },
              { kod: "F16", yillar: [2014, 2019] },
              { kod: "G06", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Mercedes-Benz",
        modeller: [
          {
            ad: "GLA",
            kasalar: [
              { kod: "X156", yillar: [2013, 2019] },
              { kod: "H247", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "GLC",
            kasalar: [
              { kod: "X253", yillar: [2015, 2022] },
              { kod: "X254", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "GLE",
            kasalar: [
              { kod: "W166", yillar: [2011, 2018] },
              { kod: "V167", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "GLK",
            kasalar: [
              { kod: "X204", yillar: [2008, 2015] },
            ],
          },
          {
            ad: "ML",
            kasalar: [
              { kod: "W163", yillar: [1997, 2005] },
              { kod: "W164", yillar: [2005, 2011] },
              { kod: "W166", yillar: [2011, 2015] },
            ],
          },
        ],
      },
      {
        ad: "Audi",
        modeller: [
          {
            ad: "Q3",
            kasalar: [
              { kod: "8U", yillar: [2011, 2018] },
              { kod: "F3", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Q5",
            kasalar: [
              { kod: "8R", yillar: [2008, 2016] },
              { kod: "FY", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Q7",
            kasalar: [
              { kod: "4L", yillar: [2005, 2015] },
              { kod: "4M", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "Q2",
            kasalar: [
              { kod: "GA", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Jeep",
        modeller: [
          {
            ad: "Grand Cherokee",
            kasalar: [
              { kod: "ZJ", yillar: [1992, 1998] },
              { kod: "WJ", yillar: [1999, 2004] },
              { kod: "WK", yillar: [2005, 2010] },
              { kod: "WK2", yillar: [2010, 2021] },
              { kod: "WL", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Wrangler",
            kasalar: [
              { kod: "YJ", yillar: [1987, 1995] },
              { kod: "TJ", yillar: [1997, 2006] },
              { kod: "JK", yillar: [2006, 2018] },
              { kod: "JL", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Renegade",
            kasalar: [
              { kod: "BU", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Compass",
            kasalar: [
              { kod: "MK49", yillar: [2006, 2016] },
              { kod: "MP521", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Land Rover",
        modeller: [
          {
            ad: "Range Rover",
            kasalar: [
              { kod: "L322", yillar: [2001, 2012] },
              { kod: "L405", yillar: [2012, 2022] },
              { kod: "L460", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Range Rover Sport",
            kasalar: [
              { kod: "L320", yillar: [2005, 2013] },
              { kod: "L494", yillar: [2013, 2022] },
              { kod: "L461", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Discovery",
            kasalar: [
              { kod: "L319", yillar: [2004, 2016] },
              { kod: "L462", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Range Rover Evoque",
            kasalar: [
              { kod: "L538", yillar: [2011, 2019] },
              { kod: "L551", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Defender",
            kasalar: [
              { kod: "L316", yillar: [1990, 2016] },
              { kod: "L663", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Porsche",
        modeller: [
          {
            ad: "Cayenne",
            kasalar: [
              { kod: "9PA", yillar: [2002, 2010] },
              { kod: "92A", yillar: [2010, 2018] },
              { kod: "9YA", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Macan",
            kasalar: [
              { kod: "95B", yillar: [2013, 2023] },
              { kod: "J1", yillar: [2024, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Volvo",
        modeller: [
          {
            ad: "XC40",
            kasalar: [
              { kod: "536", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "XC60",
            kasalar: [
              { kod: "156", yillar: [2008, 2017] },
              { kod: "246", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "XC90",
            kasalar: [
              { kod: "C/2.Nesil", yillar: [2002, 2014] },
              { kod: "256", yillar: [2014, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Toyota",
        modeller: [
          {
            ad: "RAV4",
            kasalar: [
              { kod: "XA10", yillar: [1994, 2000] },
              { kod: "XA20", yillar: [2000, 2005] },
              { kod: "XA30", yillar: [2005, 2012] },
              { kod: "XA40", yillar: [2012, 2018] },
              { kod: "XA50", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Land Cruiser",
            kasalar: [
              { kod: "J80", yillar: [1990, 1997] },
              { kod: "J100", yillar: [1998, 2007] },
              { kod: "J200", yillar: [2007, 2021] },
              { kod: "J300", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Land Cruiser Prado",
            kasalar: [
              { kod: "J90", yillar: [1996, 2002] },
              { kod: "J120", yillar: [2002, 2009] },
              { kod: "J150", yillar: [2009, 2024] },
            ],
          },
          {
            ad: "C-HR",
            kasalar: [
              { kod: "AX10", yillar: [2016, 2023] },
              { kod: "AX50", yillar: [2023, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Nissan",
        modeller: [
          {
            ad: "Qashqai",
            kasalar: [
              { kod: "J10", yillar: [2006, 2013] },
              { kod: "J11", yillar: [2013, 2021] },
              { kod: "J12", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "X-Trail",
            kasalar: [
              { kod: "T30", yillar: [2001, 2007] },
              { kod: "T31", yillar: [2007, 2014] },
              { kod: "T32", yillar: [2013, 2022] },
              { kod: "T33", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Juke",
            kasalar: [
              { kod: "F15", yillar: [2010, 2019] },
              { kod: "F16", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Pathfinder",
            kasalar: [
              { kod: "R51", yillar: [2004, 2012] },
              { kod: "R52", yillar: [2012, 2021] },
              { kod: "R53", yillar: [2021, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Hyundai",
        modeller: [
          {
            ad: "Tucson",
            kasalar: [
              { kod: "JM", yillar: [2004, 2009] },
              { kod: "LM", yillar: [2009, 2015] },
              { kod: "TL", yillar: [2015, 2020] },
              { kod: "NX4", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Santa Fe",
            kasalar: [
              { kod: "SM", yillar: [2000, 2006] },
              { kod: "CM", yillar: [2006, 2012] },
              { kod: "DM", yillar: [2012, 2018] },
              { kod: "TM", yillar: [2018, 2024] },
              { kod: "MX5", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "ix35",
            kasalar: [
              { kod: "EL", yillar: [2009, 2015] },
            ],
          },
          {
            ad: "Kona",
            kasalar: [
              { kod: "OS", yillar: [2017, 2023] },
              { kod: "SX2", yillar: [2023, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Kia",
        modeller: [
          {
            ad: "Sportage",
            kasalar: [
              { kod: "KM", yillar: [2004, 2010] },
              { kod: "SL", yillar: [2010, 2016] },
              { kod: "QL", yillar: [2016, 2021] },
              { kod: "NQ5", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Sorento",
            kasalar: [
              { kod: "BL", yillar: [2002, 2009] },
              { kod: "XM", yillar: [2009, 2014] },
              { kod: "UM", yillar: [2014, 2020] },
              { kod: "MQ4", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Stonic",
            kasalar: [
              { kod: "YB", yillar: [2017, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Dacia",
        modeller: [
          {
            ad: "Duster",
            kasalar: [
              { kod: "1.Nesil", yillar: [2010, 2017] },
              { kod: "2.Nesil", yillar: [2017, 2023] },
              { kod: "3.Nesil", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "Jogger",
            kasalar: [
              { kod: "1.Nesil", yillar: [2021, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Renault",
        modeller: [
          {
            ad: "Kadjar",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2022] },
            ],
          },
          {
            ad: "Koleos",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2016] },
              { kod: "2.Nesil", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Captur",
            kasalar: [
              { kod: "J87", yillar: [2013, 2019] },
              { kod: "J87ph2", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Ford",
        modeller: [
          {
            ad: "Kuga",
            kasalar: [
              { kod: "Mk1", yillar: [2008, 2012] },
              { kod: "Mk2", yillar: [2012, 2019] },
              { kod: "Mk3", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "EcoSport",
            kasalar: [
              { kod: "Mk2", yillar: [2012, 2017] },
              { kod: "Mk3", yillar: [2017, 2022] },
            ],
          },
          {
            ad: "Puma",
            kasalar: [
              { kod: "Mk1", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Volkswagen",
        modeller: [
          {
            ad: "Tiguan",
            kasalar: [
              { kod: "5N", yillar: [2007, 2016] },
              { kod: "AD1", yillar: [2016, 2023] },
              { kod: "BW2", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "T-Roc",
            kasalar: [
              { kod: "A1", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Touareg",
            kasalar: [
              { kod: "7L", yillar: [2002, 2010] },
              { kod: "7P", yillar: [2010, 2018] },
              { kod: "CR", yillar: [2018, 2025] },
            ],
          },
        ],
      },
      {
        ad: "TOGG",
        modeller: [
          {
            ad: "T10X",
            kasalar: [
              { kod: "1.Nesil", yillar: [2023, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Opel",
        modeller: [
          {
            ad: "Mokka",
            kasalar: [
              { kod: "J13", yillar: [2012, 2019] },
              { kod: "B", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Grandland",
            kasalar: [
              { kod: "A18", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Antara",
            kasalar: [
              { kod: "C100", yillar: [2006, 2015] },
            ],
          },
        ],
      },
      {
        ad: "Peugeot",
        modeller: [
          {
            ad: "2008",
            kasalar: [
              { kod: "A94", yillar: [2013, 2019] },
              { kod: "P24", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "3008",
            kasalar: [
              { kod: "T84", yillar: [2009, 2016] },
              { kod: "P84", yillar: [2016, 2023] },
              { kod: "E3", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "5008",
            kasalar: [
              { kod: "T87", yillar: [2009, 2017] },
              { kod: "P87", yillar: [2017, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Fiat",
        modeller: [
          {
            ad: "Egea Cross",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "500X",
            kasalar: [
              { kod: "334", yillar: [2014, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Mitsubishi",
        modeller: [
          {
            ad: "Outlander",
            kasalar: [
              { kod: "CU", yillar: [2001, 2006] },
              { kod: "CW", yillar: [2006, 2012] },
              { kod: "GF/GG", yillar: [2012, 2021] },
              { kod: "4.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "ASX",
            kasalar: [
              { kod: "GA", yillar: [2010, 2023] },
              { kod: "2.Nesil", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "Pajero",
            kasalar: [
              { kod: "V20", yillar: [1991, 1999] },
              { kod: "V60/V70", yillar: [1999, 2006] },
              { kod: "V80/V90", yillar: [2006, 2021] },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "motosiklet",
    ad: "Motosiklet",
    emoji: "🏍️",
    markalar: [
      {
        ad: "Honda",
        modeller: [
          {
            ad: "CB500F",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2018] },
              { kod: "2.Nesil", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "CB650R",
            kasalar: [
              { kod: "1.Nesil", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "CBR600RR",
            kasalar: [
              { kod: "PC37", yillar: [2003, 2006] },
              { kod: "PC40", yillar: [2007, 2012] },
              { kod: "PC37-2", yillar: [2013, 2020] },
            ],
          },
          {
            ad: "CBR1000RR",
            kasalar: [
              { kod: "SC57", yillar: [2004, 2007] },
              { kod: "SC59", yillar: [2008, 2016] },
              { kod: "SC77", yillar: [2017, 2019] },
              { kod: "SC82", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "NC750X",
            kasalar: [
              { kod: "1.Nesil", yillar: [2012, 2020] },
              { kod: "2.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Africa Twin",
            kasalar: [
              { kod: "CRF1000L", yillar: [2015, 2019] },
              { kod: "CRF1100L", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "PCX 125",
            kasalar: [
              { kod: "JF28", yillar: [2010, 2017] },
              { kod: "JF81", yillar: [2018, 2020] },
              { kod: "JK05", yillar: [2021, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Yamaha",
        modeller: [
          {
            ad: "MT-07",
            kasalar: [
              { kod: "1.Nesil", yillar: [2014, 2017] },
              { kod: "2.Nesil", yillar: [2018, 2020] },
              { kod: "3.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "MT-09",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2016] },
              { kod: "2.Nesil", yillar: [2017, 2020] },
              { kod: "3.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "YZF-R1",
            kasalar: [
              { kod: "4XV", yillar: [1998, 2001] },
              { kod: "5JJ", yillar: [2002, 2003] },
              { kod: "5VY", yillar: [2004, 2006] },
              { kod: "4C8", yillar: [2007, 2008] },
              { kod: "14B", yillar: [2009, 2014] },
              { kod: "RN32", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "YZF-R6",
            kasalar: [
              { kod: "5EB", yillar: [1998, 2002] },
              { kod: "5SL", yillar: [2003, 2005] },
              { kod: "2C0", yillar: [2006, 2016] },
              { kod: "RJ27", yillar: [2017, 2020] },
            ],
          },
          {
            ad: "Tracer 9",
            kasalar: [
              { kod: "RN57", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "TMAX",
            kasalar: [
              { kod: "SJ01", yillar: [2001, 2007] },
              { kod: "SJ08", yillar: [2008, 2011] },
              { kod: "SJ12", yillar: [2012, 2016] },
              { kod: "SJ17", yillar: [2017, 2019] },
              { kod: "SJ20", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Kawasaki",
        modeller: [
          {
            ad: "Z650",
            kasalar: [
              { kod: "1.Nesil", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Z900",
            kasalar: [
              { kod: "1.Nesil", yillar: [2017, 2020] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Ninja 400",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Ninja ZX-6R",
            kasalar: [
              { kod: "ZX636C", yillar: [2005, 2006] },
              { kod: "ZX636D", yillar: [2007, 2008] },
              { kod: "ZX636E", yillar: [2013, 2018] },
              { kod: "ZX636G", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Ninja ZX-10R",
            kasalar: [
              { kod: "ZX1000C", yillar: [2004, 2005] },
              { kod: "ZX1000D", yillar: [2006, 2007] },
              { kod: "ZX1000E", yillar: [2008, 2010] },
              { kod: "ZX1000J", yillar: [2011, 2015] },
              { kod: "ZX1000S", yillar: [2016, 2020] },
              { kod: "ZX1002E", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Versys 650",
            kasalar: [
              { kod: "1.Nesil", yillar: [2006, 2014] },
              { kod: "2.Nesil", yillar: [2015, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Suzuki",
        modeller: [
          {
            ad: "GSX-R600",
            kasalar: [
              { kod: "SRAD", yillar: [1997, 2000] },
              { kod: "K1-K3", yillar: [2001, 2003] },
              { kod: "K4-K5", yillar: [2004, 2005] },
              { kod: "K6-K7", yillar: [2006, 2007] },
              { kod: "K8-L0", yillar: [2008, 2010] },
            ],
          },
          {
            ad: "GSX-S750",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2021] },
            ],
          },
          {
            ad: "V-Strom 650",
            kasalar: [
              { kod: "1.Nesil", yillar: [2004, 2011] },
              { kod: "2.Nesil", yillar: [2011, 2016] },
              { kod: "3.Nesil", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Burgman 400",
            kasalar: [
              { kod: "AN400", yillar: [1999, 2006] },
              { kod: "AN400A", yillar: [2007, 2016] },
              { kod: "AN400A2", yillar: [2017, 2025] },
            ],
          },
        ],
      },
      {
        ad: "BMW Motorrad",
        modeller: [
          {
            ad: "R 1250 GS",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "R 1200 GS",
            kasalar: [
              { kod: "R1200GS-1", yillar: [2004, 2012] },
              { kod: "R1200GS-2", yillar: [2013, 2018] },
            ],
          },
          {
            ad: "S 1000 RR",
            kasalar: [
              { kod: "1.Nesil", yillar: [2009, 2018] },
              { kod: "2.Nesil", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "F 850 GS",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "G 310 R",
            kasalar: [
              { kod: "1.Nesil", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "KTM",
        modeller: [
          {
            ad: "Duke 390",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2016] },
              { kod: "2.Nesil", yillar: [2017, 2022] },
              { kod: "3.Nesil", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "Duke 790",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "1290 Super Duke R",
            kasalar: [
              { kod: "1.Nesil", yillar: [2014, 2019] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Adventure 890",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Ducati",
        modeller: [
          {
            ad: "Monster",
            kasalar: [
              { kod: "M600-M900", yillar: [1993, 2004] },
              { kod: "696/796/1100", yillar: [2008, 2014] },
              { kod: "821/1200", yillar: [2014, 2020] },
              { kod: "937", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Panigale V4",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2021] },
              { kod: "2.Nesil", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Multistrada",
            kasalar: [
              { kod: "620/1000", yillar: [2003, 2009] },
              { kod: "1200", yillar: [2010, 2017] },
              { kod: "950/1260", yillar: [2017, 2021] },
              { kod: "V2/V4", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Scrambler",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Triumph",
        modeller: [
          {
            ad: "Street Triple",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2012] },
              { kod: "2.Nesil", yillar: [2013, 2016] },
              { kod: "3.Nesil", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Bonneville T120",
            kasalar: [
              { kod: "1.Nesil", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Tiger 900",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Speed Triple",
            kasalar: [
              { kod: "T509", yillar: [1994, 2004] },
              { kod: "1050", yillar: [2005, 2017] },
              { kod: "1200", yillar: [2021, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Royal Enfield",
        modeller: [
          {
            ad: "Classic 350",
            kasalar: [
              { kod: "1.Nesil", yillar: [2010, 2020] },
              { kod: "2.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Meteor 350",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Interceptor 650",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Himalayan",
            kasalar: [
              { kod: "1.Nesil", yillar: [2016, 2022] },
              { kod: "2.Nesil", yillar: [2023, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Harley-Davidson",
        modeller: [
          {
            ad: "Sportster",
            kasalar: [
              { kod: "XL883/1200", yillar: [1986, 2021] },
              { kod: "S", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Softail",
            kasalar: [
              { kod: "FLSTC/FXST", yillar: [1984, 2017] },
              { kod: "FXST/FLST", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Fat Boy",
            kasalar: [
              { kod: "FLSTF", yillar: [1990, 2017] },
              { kod: "FLFBS", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Iron 883",
            kasalar: [
              { kod: "XL883N", yillar: [2009, 2020] },
            ],
          },
        ],
      },
      {
        ad: "Aprilia",
        modeller: [
          {
            ad: "RS 660",
            kasalar: [
              { kod: "1.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Tuono V4",
            kasalar: [
              { kod: "1.Nesil", yillar: [2011, 2015] },
              { kod: "2.Nesil", yillar: [2015, 2020] },
              { kod: "3.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "RSV4",
            kasalar: [
              { kod: "1.Nesil", yillar: [2009, 2014] },
              { kod: "2.Nesil", yillar: [2015, 2020] },
              { kod: "3.Nesil", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "SX 125",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Indian",
        modeller: [
          {
            ad: "Scout",
            kasalar: [
              { kod: "1.Nesil", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Chief",
            kasalar: [
              { kod: "1.Nesil", yillar: [2014, 2022] },
              { kod: "2.Nesil", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "FTR 1200",
            kasalar: [
              { kod: "1.Nesil", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Benelli",
        modeller: [
          {
            ad: "TNT 135",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2025] },
            ],
          },
          {
            ad: "TNT 300",
            kasalar: [
              { kod: "1.Nesil", yillar: [2012, 2025] },
            ],
          },
          {
            ad: "TRK 502",
            kasalar: [
              { kod: "1.Nesil", yillar: [2017, 2025] },
            ],
          },
          {
            ad: "Leoncino 500",
            kasalar: [
              { kod: "1.Nesil", yillar: [2017, 2025] },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "minivan-panelvan",
    ad: "Minivan & Panelvan",
    emoji: "🚐",
    markalar: [
      {
        ad: "Volkswagen",
        modeller: [
          {
            ad: "Transporter",
            kasalar: [
              { kod: "T4", yillar: [1990, 2003] },
              { kod: "T5", yillar: [2003, 2015] },
              { kod: "T6", yillar: [2015, 2019] },
              { kod: "T6.1", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Caddy",
            kasalar: [
              { kod: "9K/9U", yillar: [1995, 2004] },
              { kod: "2K", yillar: [2004, 2015] },
              { kod: "SA", yillar: [2015, 2020] },
              { kod: "SB", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Multivan",
            kasalar: [
              { kod: "T4", yillar: [1990, 2003] },
              { kod: "T5", yillar: [2003, 2015] },
              { kod: "T6/T6.1", yillar: [2015, 2021] },
              { kod: "T7", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Caravelle",
            kasalar: [
              { kod: "T4", yillar: [1990, 2003] },
              { kod: "T5", yillar: [2003, 2015] },
              { kod: "T6/T6.1", yillar: [2015, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Ford",
        modeller: [
          {
            ad: "Transit",
            kasalar: [
              { kod: "Mk6", yillar: [2000, 2006] },
              { kod: "Mk7", yillar: [2006, 2013] },
              { kod: "Mk8", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "Tourneo",
            kasalar: [
              { kod: "Connect", yillar: [2002, 2013] },
              { kod: "Courier", yillar: [2013, 2023] },
              { kod: "Custom", yillar: [2012, 2023] },
            ],
          },
          {
            ad: "Transit Courier",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2022] },
              { kod: "2.Nesil", yillar: [2023, 2025] },
            ],
          },
          {
            ad: "Transit Connect",
            kasalar: [
              { kod: "Mk1", yillar: [2002, 2013] },
              { kod: "Mk2", yillar: [2013, 2022] },
              { kod: "Mk3", yillar: [2022, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Mercedes-Benz",
        modeller: [
          {
            ad: "Vito",
            kasalar: [
              { kod: "W638", yillar: [1996, 2003] },
              { kod: "W639", yillar: [2003, 2014] },
              { kod: "W447", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Sprinter",
            kasalar: [
              { kod: "W901-905", yillar: [1995, 2006] },
              { kod: "W906", yillar: [2006, 2018] },
              { kod: "W907", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Viano",
            kasalar: [
              { kod: "W639", yillar: [2003, 2014] },
            ],
          },
          {
            ad: "V Serisi",
            kasalar: [
              { kod: "W447", yillar: [2014, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Renault",
        modeller: [
          {
            ad: "Kangoo",
            kasalar: [
              { kod: "KC", yillar: [1997, 2008] },
              { kod: "KW", yillar: [2008, 2020] },
              { kod: "FC", yillar: [2021, 2025] },
            ],
          },
          {
            ad: "Traffic / Trafic",
            kasalar: [
              { kod: "T", yillar: [1980, 2001] },
              { kod: "X83", yillar: [2001, 2014] },
              { kod: "X82", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Master",
            kasalar: [
              { kod: "T28-T35", yillar: [1980, 1997] },
              { kod: "X70", yillar: [1997, 2010] },
              { kod: "X62", yillar: [2010, 2024] },
              { kod: "X63", yillar: [2024, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Peugeot",
        modeller: [
          {
            ad: "Partner",
            kasalar: [
              { kod: "M49", yillar: [1996, 2002] },
              { kod: "M59", yillar: [2002, 2008] },
              { kod: "B9", yillar: [2008, 2018] },
              { kod: "K9", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Boxer",
            kasalar: [
              { kod: "230L", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2011] },
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
          {
            ad: "Rifter",
            kasalar: [
              { kod: "K9", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Traveller",
            kasalar: [
              { kod: "V", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Citroën",
        modeller: [
          {
            ad: "Berlingo",
            kasalar: [
              { kod: "M49", yillar: [1996, 2002] },
              { kod: "M59", yillar: [2002, 2008] },
              { kod: "B9", yillar: [2008, 2018] },
              { kod: "K9", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Jumpy",
            kasalar: [
              { kod: "U60", yillar: [1994, 2006] },
              { kod: "X", yillar: [2007, 2016] },
              { kod: "K0", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Jumper",
            kasalar: [
              { kod: "230L", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2006] },
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
          {
            ad: "SpaceTourer",
            kasalar: [
              { kod: "1.Nesil", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Fiat",
        modeller: [
          {
            ad: "Doblo",
            kasalar: [
              { kod: "119", yillar: [2000, 2009] },
              { kod: "263", yillar: [2009, 2022] },
              { kod: "BU7", yillar: [2022, 2025] },
            ],
          },
          {
            ad: "Fiorino",
            kasalar: [
              { kod: "146", yillar: [1988, 2007] },
              { kod: "225", yillar: [2007, 2025] },
            ],
          },
          {
            ad: "Scudo",
            kasalar: [
              { kod: "U60", yillar: [1996, 2006] },
              { kod: "270", yillar: [2007, 2016] },
              { kod: "K0", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Ducato",
            kasalar: [
              { kod: "230", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2006] },
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Opel",
        modeller: [
          {
            ad: "Combo",
            kasalar: [
              { kod: "B", yillar: [1993, 2001] },
              { kod: "C", yillar: [2001, 2011] },
              { kod: "D", yillar: [2011, 2018] },
              { kod: "E", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Vivaro",
            kasalar: [
              { kod: "A", yillar: [2001, 2014] },
              { kod: "B", yillar: [2014, 2019] },
              { kod: "C", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Movano",
            kasalar: [
              { kod: "X70", yillar: [1998, 2010] },
              { kod: "X62", yillar: [2010, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Toyota",
        modeller: [
          {
            ad: "ProAce",
            kasalar: [
              { kod: "K0", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "HiAce",
            kasalar: [
              { kod: "H100", yillar: [1989, 2004] },
              { kod: "H200", yillar: [2004, 2019] },
              { kod: "H300", yillar: [2019, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Hyundai",
        modeller: [
          {
            ad: "H-1 / Starex",
            kasalar: [
              { kod: "1.Nesil", yillar: [1997, 2007] },
              { kod: "2.Nesil", yillar: [2007, 2021] },
            ],
          },
          {
            ad: "H350",
            kasalar: [
              { kod: "1.Nesil", yillar: [2015, 2020] },
            ],
          },
        ],
      },
      {
        ad: "Nissan",
        modeller: [
          {
            ad: "NV200",
            kasalar: [
              { kod: "M20", yillar: [2009, 2025] },
            ],
          },
          {
            ad: "Primastar",
            kasalar: [
              { kod: "X83", yillar: [2002, 2014] },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "ticari",
    ad: "Ticari Araçlar",
    emoji: "🚚",
    markalar: [
      {
        ad: "Ford",
        modeller: [
          {
            ad: "Transit (Kamyon)",
            kasalar: [
              { kod: "Mk7", yillar: [2006, 2013] },
              { kod: "Mk8", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "Cargo",
            kasalar: [
              { kod: "0813/0815", yillar: [1986, 2010] },
              { kod: "1842/2533", yillar: [2010, 2025] },
            ],
          },
          {
            ad: "Trucks F-Max",
            kasalar: [
              { kod: "1.Nesil", yillar: [2018, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Volkswagen",
        modeller: [
          {
            ad: "Crafter",
            kasalar: [
              { kod: "2E", yillar: [2006, 2016] },
              { kod: "SY/SZ", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "LT",
            kasalar: [
              { kod: "40-55", yillar: [1975, 2005] },
            ],
          },
        ],
      },
      {
        ad: "Mercedes-Benz",
        modeller: [
          {
            ad: "Actros",
            kasalar: [
              { kod: "MP1", yillar: [1996, 2002] },
              { kod: "MP2", yillar: [2002, 2008] },
              { kod: "MP3", yillar: [2008, 2011] },
              { kod: "MP4", yillar: [2011, 2018] },
              { kod: "MP5", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Sprinter (Ticari)",
            kasalar: [
              { kod: "W906", yillar: [2006, 2018] },
              { kod: "W907", yillar: [2018, 2025] },
            ],
          },
          {
            ad: "Atego",
            kasalar: [
              { kod: "1.Nesil", yillar: [1998, 2013] },
              { kod: "2.Nesil", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "Axor",
            kasalar: [
              { kod: "1.Nesil", yillar: [2001, 2014] },
            ],
          },
        ],
      },
      {
        ad: "Renault",
        modeller: [
          {
            ad: "Master (Ticari)",
            kasalar: [
              { kod: "X70", yillar: [1997, 2010] },
              { kod: "X62", yillar: [2010, 2024] },
              { kod: "X63", yillar: [2024, 2025] },
            ],
          },
          {
            ad: "T Range",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2025] },
            ],
          },
          {
            ad: "D Range",
            kasalar: [
              { kod: "1.Nesil", yillar: [2013, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Peugeot",
        modeller: [
          {
            ad: "Boxer (Ticari)",
            kasalar: [
              { kod: "230", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2011] },
              { kod: "250", yillar: [2011, 2025] },
            ],
          },
          {
            ad: "Expert",
            kasalar: [
              { kod: "U60", yillar: [1994, 2006] },
              { kod: "G9", yillar: [2007, 2016] },
              { kod: "K0", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Citroën",
        modeller: [
          {
            ad: "Jumper (Ticari)",
            kasalar: [
              { kod: "230", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2006] },
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
          {
            ad: "Relay",
            kasalar: [
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Fiat",
        modeller: [
          {
            ad: "Ducato (Ticari)",
            kasalar: [
              { kod: "230", yillar: [1994, 2002] },
              { kod: "244", yillar: [2002, 2006] },
              { kod: "250", yillar: [2006, 2025] },
            ],
          },
          {
            ad: "Doblo Cargo",
            kasalar: [
              { kod: "119", yillar: [2000, 2009] },
              { kod: "263", yillar: [2009, 2022] },
              { kod: "BU7", yillar: [2022, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Iveco",
        modeller: [
          {
            ad: "Daily",
            kasalar: [
              { kod: "2.Nesil", yillar: [1990, 1999] },
              { kod: "3.Nesil", yillar: [1999, 2006] },
              { kod: "4.Nesil", yillar: [2006, 2011] },
              { kod: "5.Nesil", yillar: [2011, 2014] },
              { kod: "6.Nesil", yillar: [2014, 2025] },
            ],
          },
          {
            ad: "Stralis",
            kasalar: [
              { kod: "1.Nesil", yillar: [2002, 2012] },
              { kod: "Hi-Way", yillar: [2012, 2019] },
              { kod: "S-Way", yillar: [2019, 2025] },
            ],
          },
          {
            ad: "Trakker",
            kasalar: [
              { kod: "1.Nesil", yillar: [2003, 2012] },
              { kod: "2.Nesil", yillar: [2012, 2025] },
            ],
          },
          {
            ad: "Eurocargo",
            kasalar: [
              { kod: "Mk1", yillar: [1991, 2003] },
              { kod: "Mk2", yillar: [2003, 2015] },
              { kod: "Mk3", yillar: [2015, 2025] },
            ],
          },
        ],
      },
      {
        ad: "BMC",
        modeller: [
          {
            ad: "Pro",
            kasalar: [
              { kod: "820", yillar: [2010, 2020] },
              { kod: "Pro 22", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "Fenix",
            kasalar: [
              { kod: "1.Nesil", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "Supercargo",
            kasalar: [
              { kod: "1.Nesil", yillar: [2000, 2020] },
            ],
          },
        ],
      },
      {
        ad: "MAN",
        modeller: [
          {
            ad: "TGX",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2020] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "TGS",
            kasalar: [
              { kod: "1.Nesil", yillar: [2007, 2020] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "TGL",
            kasalar: [
              { kod: "1.Nesil", yillar: [2005, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Volvo Trucks",
        modeller: [
          {
            ad: "FH",
            kasalar: [
              { kod: "1.Nesil", yillar: [1993, 2001] },
              { kod: "2.Nesil", yillar: [2001, 2012] },
              { kod: "3.Nesil", yillar: [2012, 2020] },
              { kod: "4.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "FM",
            kasalar: [
              { kod: "1.Nesil", yillar: [1998, 2010] },
              { kod: "2.Nesil", yillar: [2010, 2020] },
              { kod: "3.Nesil", yillar: [2020, 2025] },
            ],
          },
          {
            ad: "FMX",
            kasalar: [
              { kod: "1.Nesil", yillar: [2010, 2020] },
              { kod: "2.Nesil", yillar: [2020, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Scania",
        modeller: [
          {
            ad: "R Serisi",
            kasalar: [
              { kod: "R4", yillar: [1988, 2004] },
              { kod: "R5", yillar: [2004, 2016] },
              { kod: "Next Gen R", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "G Serisi",
            kasalar: [
              { kod: "Next Gen G", yillar: [2016, 2025] },
            ],
          },
          {
            ad: "S Serisi",
            kasalar: [
              { kod: "Next Gen S", yillar: [2016, 2025] },
            ],
          },
        ],
      },
      {
        ad: "Isuzu",
        modeller: [
          {
            ad: "NKR",
            kasalar: [
              { kod: "3.Nesil", yillar: [1985, 2005] },
              { kod: "4.Nesil", yillar: [2005, 2025] },
            ],
          },
          {
            ad: "NPR",
            kasalar: [
              { kod: "1.Nesil", yillar: [1985, 2008] },
              { kod: "2.Nesil", yillar: [2008, 2025] },
            ],
          },
          {
            ad: "FVR",
            kasalar: [
              { kod: "1.Nesil", yillar: [1990, 2025] },
            ],
          },
        ],
      },
    ],
  },
];
