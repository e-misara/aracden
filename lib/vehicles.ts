export interface Kasa {
  kod: string;
  yillar: number[];
  resim: string;
}

export interface AracModel {
  model: string;
  kasalar: Kasa[];
}

export interface Marka {
  marka: string;
  modeller: AracModel[];
}

function wm(file: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;
}

function lf(brand: string, model: string) {
  let hash = 0;
  for (const c of `${brand}${model}`) hash = (hash * 31 + c.charCodeAt(0)) & 0xfffffff;
  return `https://loremflickr.com/640/360/car,automobile?lock=${Math.abs(hash) % 9000 + 1000}`;
}

function yillar(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const OTOMOBIL_MARKALARI: Marka[] = [
  {
    marka: "BMW",
    modeller: [
      {
        model: "3 Serisi",
        kasalar: [
          { kod: "E46", yillar: yillar(1998, 2006), resim: wm("BMW_E46_320d_Limousine_–_Frontansicht,_13._März_2011,_Velbert.jpg") },
          { kod: "E90", yillar: yillar(2005, 2011), resim: wm("BMW_E90_320i_Limousine.jpg") },
          { kod: "F30", yillar: yillar(2012, 2018), resim: wm("2013_BMW_320i_(F30_MY13)_sedan_(2015-11-11)_01.jpg") },
          { kod: "G20", yillar: yillar(2019, 2025), resim: wm("BMW_G20_(2022)_IMG_7316_(2).jpg") },
        ],
      },
      {
        model: "5 Serisi",
        kasalar: [
          { kod: "E60", yillar: yillar(2003, 2010), resim: wm("BMW_E60_520d_–_Frontansicht,_25._März_2012,_Velbert.jpg") },
          { kod: "F10", yillar: yillar(2010, 2016), resim: wm("BMW_F10_520d.jpg") },
          { kod: "G30", yillar: yillar(2017, 2025), resim: wm("2018_BMW_520d_SE_Saloon_(G30)_front_8.4.18.jpg") },
        ],
      },
      {
        model: "1 Serisi",
        kasalar: [
          { kod: "E87", yillar: yillar(2004, 2011), resim: lf("BMW", "1 E87") },
          { kod: "F20", yillar: yillar(2011, 2019), resim: lf("BMW", "1 F20") },
          { kod: "F40", yillar: yillar(2019, 2025), resim: wm("2019_BMW_118i_M_Sport_(F40)_front_8.7.19.jpg") },
        ],
      },
      {
        model: "X3",
        kasalar: [
          { kod: "E83", yillar: yillar(2003, 2010), resim: lf("BMW", "X3 E83") },
          { kod: "F25", yillar: yillar(2010, 2017), resim: lf("BMW", "X3 F25") },
          { kod: "G01", yillar: yillar(2017, 2025), resim: wm("BMW_G01_xDrive20d.jpg") },
        ],
      },
      {
        model: "X5",
        kasalar: [
          { kod: "E53", yillar: yillar(1999, 2006), resim: lf("BMW", "X5 E53") },
          { kod: "E70", yillar: yillar(2006, 2013), resim: lf("BMW", "X5 E70") },
          { kod: "F15", yillar: yillar(2013, 2018), resim: lf("BMW", "X5 F15") },
          { kod: "G05", yillar: yillar(2018, 2025), resim: wm("BMW_G05_xDrive30d_–_Frontansicht,_7._Oktober_2018,_Düsseldorf.jpg") },
        ],
      },
    ],
  },
  {
    marka: "Mercedes-Benz",
    modeller: [
      {
        model: "C Serisi",
        kasalar: [
          { kod: "W203", yillar: yillar(2000, 2007), resim: lf("Mercedes-Benz", "C W203") },
          { kod: "W204", yillar: yillar(2007, 2014), resim: lf("Mercedes-Benz", "C W204") },
          { kod: "W205", yillar: yillar(2014, 2021), resim: wm("Mercedes-Benz_W205_IMG_3046.jpg") },
          { kod: "W206", yillar: yillar(2021, 2025), resim: wm("Mercedes-Benz_W206_IMG_6380.jpg") },
        ],
      },
      {
        model: "E Serisi",
        kasalar: [
          { kod: "W211", yillar: yillar(2002, 2009), resim: lf("Mercedes-Benz", "E W211") },
          { kod: "W212", yillar: yillar(2009, 2016), resim: lf("Mercedes-Benz", "E W212") },
          { kod: "W213", yillar: yillar(2016, 2025), resim: wm("2020_Mercedes-Benz_E_220d_SE_(W213)_automatic_2.0_Front.jpg") },
        ],
      },
      {
        model: "A Serisi",
        kasalar: [
          { kod: "W168", yillar: yillar(1997, 2004), resim: lf("Mercedes-Benz", "A W168") },
          { kod: "W169", yillar: yillar(2004, 2012), resim: lf("Mercedes-Benz", "A W169") },
          { kod: "W176", yillar: yillar(2012, 2018), resim: lf("Mercedes-Benz", "A W176") },
          { kod: "W177", yillar: yillar(2018, 2025), resim: wm("2019_Mercedes-Benz_A_200_SE_Automatic_1.3_Front.jpg") },
        ],
      },
      {
        model: "GLC",
        kasalar: [
          { kod: "X253", yillar: yillar(2015, 2022), resim: lf("Mercedes-Benz", "GLC X253") },
          { kod: "X254", yillar: yillar(2022, 2025), resim: wm("Mercedes-Benz_X254_GLC_300e_(cropped).jpg") },
        ],
      },
    ],
  },
  {
    marka: "Audi",
    modeller: [
      {
        model: "A3",
        kasalar: [
          { kod: "8L", yillar: yillar(1996, 2003), resim: lf("Audi", "A3 8L") },
          { kod: "8P", yillar: yillar(2003, 2012), resim: lf("Audi", "A3 8P") },
          { kod: "8V", yillar: yillar(2012, 2020), resim: lf("Audi", "A3 8V") },
          { kod: "8Y", yillar: yillar(2020, 2025), resim: wm("2021_Audi_A3_S_Line_35_TFSI_S_Tronic_front_8.7.21.jpg") },
        ],
      },
      {
        model: "A4",
        kasalar: [
          { kod: "B6", yillar: yillar(2000, 2004), resim: lf("Audi", "A4 B6") },
          { kod: "B7", yillar: yillar(2004, 2008), resim: lf("Audi", "A4 B7") },
          { kod: "B8", yillar: yillar(2008, 2015), resim: lf("Audi", "A4 B8") },
          { kod: "B9", yillar: yillar(2015, 2025), resim: wm("2020_Audi_A4_S_Line_35_TDI_Quattro_S-Tronic_front_8.7.21.jpg") },
        ],
      },
      {
        model: "Q5",
        kasalar: [
          { kod: "8R", yillar: yillar(2008, 2017), resim: lf("Audi", "Q5 8R") },
          { kod: "FY", yillar: yillar(2017, 2025), resim: lf("Audi", "Q5 FY") },
        ],
      },
      {
        model: "A6",
        kasalar: [
          { kod: "C6", yillar: yillar(2004, 2011), resim: lf("Audi", "A6 C6") },
          { kod: "C7", yillar: yillar(2011, 2018), resim: lf("Audi", "A6 C7") },
          { kod: "C8", yillar: yillar(2018, 2025), resim: lf("Audi", "A6 C8") },
        ],
      },
    ],
  },
  {
    marka: "Volkswagen",
    modeller: [
      {
        model: "Golf",
        kasalar: [
          { kod: "Mk4", yillar: yillar(1997, 2003), resim: lf("Volkswagen", "Golf Mk4") },
          { kod: "Mk5", yillar: yillar(2003, 2008), resim: lf("Volkswagen", "Golf Mk5") },
          { kod: "Mk6", yillar: yillar(2008, 2012), resim: lf("Volkswagen", "Golf Mk6") },
          { kod: "Mk7", yillar: yillar(2012, 2019), resim: wm("2013_Volkswagen_Golf_1.4_TSI_BMT_Match_(9686562802).jpg") },
          { kod: "Mk8", yillar: yillar(2019, 2025), resim: wm("2020_Volkswagen_Golf_Style_1.5_Front.jpg") },
        ],
      },
      {
        model: "Passat",
        kasalar: [
          { kod: "B5", yillar: yillar(1996, 2005), resim: lf("Volkswagen", "Passat B5") },
          { kod: "B6", yillar: yillar(2005, 2010), resim: lf("Volkswagen", "Passat B6") },
          { kod: "B7", yillar: yillar(2010, 2014), resim: lf("Volkswagen", "Passat B7") },
          { kod: "B8", yillar: yillar(2014, 2025), resim: wm("Volkswagen_Passat_B8_Limousine_2.0_TDI_DSG_Highline_–_Frontansicht,_19._April_2015,_Düsseldorf.jpg") },
        ],
      },
      {
        model: "Polo",
        kasalar: [
          { kod: "Mk4", yillar: yillar(2001, 2009), resim: lf("Volkswagen", "Polo Mk4") },
          { kod: "Mk5", yillar: yillar(2009, 2017), resim: lf("Volkswagen", "Polo Mk5") },
          { kod: "Mk6", yillar: yillar(2017, 2025), resim: wm("2018_Volkswagen_Polo_SEL_TSI_1.0_Front.jpg") },
        ],
      },
      {
        model: "Tiguan",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2007, 2016), resim: lf("Volkswagen", "Tiguan 1") },
          { kod: "2.Nesil", yillar: yillar(2016, 2025), resim: wm("VW_Tiguan_2_2.0_TDI_(2016)_Frontansicht.jpg") },
        ],
      },
      {
        model: "T-Roc",
        kasalar: [
          { kod: "A1", yillar: yillar(2017, 2025), resim: wm("2020_Volkswagen_T-Roc_Cabriolet_R-Line_1.5_Front.jpg") },
        ],
      },
    ],
  },
  {
    marka: "Toyota",
    modeller: [
      {
        model: "Corolla",
        kasalar: [
          { kod: "E110", yillar: yillar(1995, 2001), resim: lf("Toyota", "Corolla E110") },
          { kod: "E120", yillar: yillar(2001, 2006), resim: lf("Toyota", "Corolla E120") },
          { kod: "E140", yillar: yillar(2006, 2012), resim: lf("Toyota", "Corolla E140") },
          { kod: "E160", yillar: yillar(2012, 2018), resim: lf("Toyota", "Corolla E160") },
          { kod: "E210", yillar: yillar(2018, 2025), resim: wm("Toyota_Corolla_Hybrid_(E210)_IMG_4338.jpg") },
        ],
      },
      {
        model: "Yaris",
        kasalar: [
          { kod: "XP10", yillar: yillar(1999, 2005), resim: lf("Toyota", "Yaris XP10") },
          { kod: "XP90", yillar: yillar(2005, 2011), resim: lf("Toyota", "Yaris XP90") },
          { kod: "XP130", yillar: yillar(2011, 2019), resim: lf("Toyota", "Yaris XP130") },
          { kod: "XP210", yillar: yillar(2019, 2025), resim: wm("2020_Toyota_Yaris_Design_HEV_CVT_1.5_Front.jpg") },
        ],
      },
      {
        model: "Camry",
        kasalar: [
          { kod: "XV40", yillar: yillar(2006, 2011), resim: lf("Toyota", "Camry XV40") },
          { kod: "XV50", yillar: yillar(2011, 2017), resim: lf("Toyota", "Camry XV50") },
          { kod: "XV70", yillar: yillar(2017, 2025), resim: lf("Toyota", "Camry XV70") },
        ],
      },
      {
        model: "C-HR",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2016, 2023), resim: lf("Toyota", "C-HR 1") },
          { kod: "2.Nesil", yillar: yillar(2023, 2025), resim: lf("Toyota", "C-HR 2") },
        ],
      },
      {
        model: "RAV4",
        kasalar: [
          { kod: "XA30", yillar: yillar(2005, 2012), resim: lf("Toyota", "RAV4 XA30") },
          { kod: "XA40", yillar: yillar(2012, 2018), resim: lf("Toyota", "RAV4 XA40") },
          { kod: "XA50", yillar: yillar(2018, 2025), resim: lf("Toyota", "RAV4 XA50") },
        ],
      },
    ],
  },
  {
    marka: "Renault",
    modeller: [
      {
        model: "Clio",
        kasalar: [
          { kod: "Mk2", yillar: yillar(1998, 2005), resim: lf("Renault", "Clio Mk2") },
          { kod: "Mk3", yillar: yillar(2005, 2012), resim: lf("Renault", "Clio Mk3") },
          { kod: "Mk4", yillar: yillar(2012, 2019), resim: lf("Renault", "Clio Mk4") },
          { kod: "Mk5", yillar: yillar(2019, 2025), resim: wm("Renault_Clio_(V,_Facelift)_–_f_02092025.jpg") },
        ],
      },
      {
        model: "Megane",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2002, 2008), resim: lf("Renault", "Megane Mk2") },
          { kod: "Mk3", yillar: yillar(2008, 2016), resim: lf("Renault", "Megane Mk3") },
          { kod: "Mk4", yillar: yillar(2016, 2025), resim: wm("Renault_Megane_IV_–_Frontansicht,_27._September_2016,_Düsseldorf.jpg") },
        ],
      },
      {
        model: "Symbol",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(1999, 2008), resim: lf("Renault", "Symbol 1") },
          { kod: "2.Nesil", yillar: yillar(2008, 2012), resim: lf("Renault", "Symbol 2") },
          { kod: "3.Nesil", yillar: yillar(2012, 2021), resim: lf("Renault", "Symbol 3") },
        ],
      },
      {
        model: "Fluence",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2009, 2017), resim: lf("Renault", "Fluence 1") },
        ],
      },
      {
        model: "Kadjar",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2015, 2022), resim: lf("Renault", "Kadjar 1") },
        ],
      },
      {
        model: "Captur",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2013, 2019), resim: lf("Renault", "Captur Mk1") },
          { kod: "Mk2", yillar: yillar(2019, 2025), resim: lf("Renault", "Captur Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Ford",
    modeller: [
      {
        model: "Focus",
        kasalar: [
          { kod: "Mk1", yillar: yillar(1998, 2004), resim: lf("Ford", "Focus Mk1") },
          { kod: "Mk2", yillar: yillar(2004, 2011), resim: lf("Ford", "Focus Mk2") },
          { kod: "Mk3", yillar: yillar(2011, 2018), resim: lf("Ford", "Focus Mk3") },
          { kod: "Mk4", yillar: yillar(2018, 2025), resim: wm("2019_Ford_Focus_ST-Line_X_1.5_EcoBlue_(facelift)_front_8.4.22.jpg") },
        ],
      },
      {
        model: "Fiesta",
        kasalar: [
          { kod: "Mk5", yillar: yillar(2001, 2008), resim: lf("Ford", "Fiesta Mk5") },
          { kod: "Mk6", yillar: yillar(2008, 2017), resim: lf("Ford", "Fiesta Mk6") },
          { kod: "Mk7", yillar: yillar(2017, 2023), resim: wm("2018_Ford_Fiesta_Titanium_1.0_(facelift)_front_8.4.22.jpg") },
        ],
      },
      {
        model: "Mondeo",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2000, 2007), resim: lf("Ford", "Mondeo Mk3") },
          { kod: "Mk4", yillar: yillar(2007, 2014), resim: lf("Ford", "Mondeo Mk4") },
          { kod: "Mk5", yillar: yillar(2014, 2022), resim: lf("Ford", "Mondeo Mk5") },
        ],
      },
      {
        model: "Kuga",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2008, 2012), resim: lf("Ford", "Kuga Mk1") },
          { kod: "Mk2", yillar: yillar(2012, 2019), resim: lf("Ford", "Kuga Mk2") },
          { kod: "Mk3", yillar: yillar(2019, 2025), resim: lf("Ford", "Kuga Mk3") },
        ],
      },
      {
        model: "Puma",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2019, 2025), resim: lf("Ford", "Puma Mk1") },
        ],
      },
    ],
  },
  {
    marka: "Fiat",
    modeller: [
      {
        model: "Egea",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2015, 2025), resim: wm("Fiat_Tipo_356_2016_front.jpg") },
        ],
      },
      {
        model: "Doblo",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2000, 2010), resim: lf("Fiat", "Doblo 1") },
          { kod: "2.Nesil", yillar: yillar(2010, 2022), resim: lf("Fiat", "Doblo 2") },
          { kod: "3.Nesil", yillar: yillar(2022, 2025), resim: lf("Fiat", "Doblo 3") },
        ],
      },
      {
        model: "500",
        kasalar: [
          { kod: "312", yillar: yillar(2007, 2019), resim: lf("Fiat", "500 312") },
          { kod: "332", yillar: yillar(2020, 2025), resim: lf("Fiat", "500 332") },
        ],
      },
      {
        model: "Punto",
        kasalar: [
          { kod: "188", yillar: yillar(1999, 2010), resim: lf("Fiat", "Punto 188") },
          { kod: "199", yillar: yillar(2005, 2018), resim: lf("Fiat", "Punto 199") },
        ],
      },
    ],
  },
  {
    marka: "Hyundai",
    modeller: [
      {
        model: "i20",
        kasalar: [
          { kod: "PB", yillar: yillar(2008, 2014), resim: lf("Hyundai", "i20 PB") },
          { kod: "GB", yillar: yillar(2014, 2020), resim: lf("Hyundai", "i20 GB") },
          { kod: "BC3", yillar: yillar(2020, 2025), resim: wm("2021_Hyundai_i20_Premium_T-GDi_front_8.7.21.jpg") },
        ],
      },
      {
        model: "i30",
        kasalar: [
          { kod: "FD", yillar: yillar(2007, 2012), resim: lf("Hyundai", "i30 FD") },
          { kod: "GD", yillar: yillar(2012, 2017), resim: lf("Hyundai", "i30 GD") },
          { kod: "PD", yillar: yillar(2017, 2025), resim: lf("Hyundai", "i30 PD") },
        ],
      },
      {
        model: "Tucson",
        kasalar: [
          { kod: "JM", yillar: yillar(2004, 2009), resim: lf("Hyundai", "Tucson JM") },
          { kod: "LM", yillar: yillar(2009, 2015), resim: lf("Hyundai", "Tucson LM") },
          { kod: "TL", yillar: yillar(2015, 2021), resim: lf("Hyundai", "Tucson TL") },
          { kod: "NX4", yillar: yillar(2021, 2025), resim: lf("Hyundai", "Tucson NX4") },
        ],
      },
      {
        model: "Elantra",
        kasalar: [
          { kod: "HD", yillar: yillar(2006, 2010), resim: lf("Hyundai", "Elantra HD") },
          { kod: "MD", yillar: yillar(2010, 2016), resim: lf("Hyundai", "Elantra MD") },
          { kod: "AD", yillar: yillar(2016, 2021), resim: lf("Hyundai", "Elantra AD") },
          { kod: "CN7", yillar: yillar(2020, 2025), resim: lf("Hyundai", "Elantra CN7") },
        ],
      },
    ],
  },
  {
    marka: "Kia",
    modeller: [
      {
        model: "Ceed",
        kasalar: [
          { kod: "ED", yillar: yillar(2007, 2012), resim: lf("Kia", "Ceed ED") },
          { kod: "JD", yillar: yillar(2012, 2018), resim: lf("Kia", "Ceed JD") },
          { kod: "CD", yillar: yillar(2018, 2025), resim: lf("Kia", "Ceed CD") },
        ],
      },
      {
        model: "Sportage",
        kasalar: [
          { kod: "KM", yillar: yillar(2004, 2010), resim: lf("Kia", "Sportage KM") },
          { kod: "SL", yillar: yillar(2010, 2016), resim: lf("Kia", "Sportage SL") },
          { kod: "QL", yillar: yillar(2016, 2021), resim: lf("Kia", "Sportage QL") },
          { kod: "NQ5", yillar: yillar(2021, 2025), resim: lf("Kia", "Sportage NQ5") },
        ],
      },
      {
        model: "Picanto",
        kasalar: [
          { kod: "SA", yillar: yillar(2004, 2011), resim: lf("Kia", "Picanto SA") },
          { kod: "TA", yillar: yillar(2011, 2017), resim: lf("Kia", "Picanto TA") },
          { kod: "JA", yillar: yillar(2017, 2025), resim: lf("Kia", "Picanto JA") },
        ],
      },
      {
        model: "Stonic",
        kasalar: [
          { kod: "YB", yillar: yillar(2017, 2025), resim: lf("Kia", "Stonic YB") },
        ],
      },
    ],
  },
  {
    marka: "Skoda",
    modeller: [
      {
        model: "Octavia",
        kasalar: [
          { kod: "1U", yillar: yillar(1996, 2010), resim: lf("Skoda", "Octavia 1U") },
          { kod: "1Z", yillar: yillar(2004, 2013), resim: lf("Skoda", "Octavia 1Z") },
          { kod: "5E", yillar: yillar(2012, 2020), resim: lf("Skoda", "Octavia 5E") },
          { kod: "NX", yillar: yillar(2020, 2025), resim: wm("2021_Skoda_Octavia_Style_TSI_front_8.7.21.jpg") },
        ],
      },
      {
        model: "Fabia",
        kasalar: [
          { kod: "6Y", yillar: yillar(1999, 2007), resim: lf("Skoda", "Fabia 6Y") },
          { kod: "5J", yillar: yillar(2007, 2014), resim: lf("Skoda", "Fabia 5J") },
          { kod: "NJ", yillar: yillar(2014, 2021), resim: lf("Skoda", "Fabia NJ") },
          { kod: "PJ", yillar: yillar(2021, 2025), resim: lf("Skoda", "Fabia PJ") },
        ],
      },
      {
        model: "Karoq",
        kasalar: [
          { kod: "NU7", yillar: yillar(2017, 2025), resim: lf("Skoda", "Karoq NU7") },
        ],
      },
    ],
  },
  {
    marka: "SEAT",
    modeller: [
      {
        model: "Leon",
        kasalar: [
          { kod: "1M", yillar: yillar(1999, 2005), resim: lf("SEAT", "Leon 1M") },
          { kod: "1P", yillar: yillar(2005, 2012), resim: lf("SEAT", "Leon 1P") },
          { kod: "5F", yillar: yillar(2012, 2020), resim: lf("SEAT", "Leon 5F") },
          { kod: "KL", yillar: yillar(2020, 2025), resim: lf("SEAT", "Leon KL") },
        ],
      },
      {
        model: "Ibiza",
        kasalar: [
          { kod: "6L", yillar: yillar(2002, 2008), resim: lf("SEAT", "Ibiza 6L") },
          { kod: "6J", yillar: yillar(2008, 2017), resim: lf("SEAT", "Ibiza 6J") },
          { kod: "KJ", yillar: yillar(2017, 2025), resim: lf("SEAT", "Ibiza KJ") },
        ],
      },
      {
        model: "Ateca",
        kasalar: [
          { kod: "KH7", yillar: yillar(2016, 2025), resim: lf("SEAT", "Ateca KH7") },
        ],
      },
    ],
  },
  {
    marka: "Peugeot",
    modeller: [
      {
        model: "208",
        kasalar: [
          { kod: "A9", yillar: yillar(2012, 2019), resim: lf("Peugeot", "208 A9") },
          { kod: "UB", yillar: yillar(2019, 2025), resim: wm("2020_Peugeot_208_Active_Premium_PureTech_front_8.4.22.jpg") },
        ],
      },
      {
        model: "308",
        kasalar: [
          { kod: "T7", yillar: yillar(2007, 2013), resim: lf("Peugeot", "308 T7") },
          { kod: "T9", yillar: yillar(2013, 2021), resim: lf("Peugeot", "308 T9") },
          { kod: "T1", yillar: yillar(2021, 2025), resim: lf("Peugeot", "308 T1") },
        ],
      },
      {
        model: "2008",
        kasalar: [
          { kod: "A94", yillar: yillar(2013, 2019), resim: lf("Peugeot", "2008 A94") },
          { kod: "P24", yillar: yillar(2019, 2025), resim: lf("Peugeot", "2008 P24") },
        ],
      },
      {
        model: "3008",
        kasalar: [
          { kod: "T84", yillar: yillar(2008, 2016), resim: lf("Peugeot", "3008 T84") },
          { kod: "P84", yillar: yillar(2016, 2025), resim: lf("Peugeot", "3008 P84") },
        ],
      },
    ],
  },
  {
    marka: "Citroën",
    modeller: [
      {
        model: "C3",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2002, 2009), resim: lf("Citroën", "C3 Mk1") },
          { kod: "Mk2", yillar: yillar(2009, 2016), resim: lf("Citroën", "C3 Mk2") },
          { kod: "Mk3", yillar: yillar(2016, 2025), resim: lf("Citroën", "C3 Mk3") },
        ],
      },
      {
        model: "C4",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2004, 2010), resim: lf("Citroën", "C4 Mk1") },
          { kod: "Mk2", yillar: yillar(2010, 2018), resim: lf("Citroën", "C4 Mk2") },
          { kod: "Mk3", yillar: yillar(2020, 2025), resim: lf("Citroën", "C4 Mk3") },
        ],
      },
      {
        model: "C5 Aircross",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2018, 2025), resim: lf("Citroën", "C5 Aircross 1") },
        ],
      },
    ],
  },
  {
    marka: "Dacia",
    modeller: [
      {
        model: "Sandero",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2008, 2012), resim: lf("Dacia", "Sandero Mk1") },
          { kod: "Mk2", yillar: yillar(2012, 2020), resim: lf("Dacia", "Sandero Mk2") },
          { kod: "Mk3", yillar: yillar(2020, 2025), resim: wm("2021_Dacia_Sandero_Stepway_Comfort_SCe_65_front_8.7.21.jpg") },
        ],
      },
      {
        model: "Logan",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2004, 2012), resim: lf("Dacia", "Logan Mk1") },
          { kod: "Mk2", yillar: yillar(2012, 2021), resim: lf("Dacia", "Logan Mk2") },
          { kod: "Mk3", yillar: yillar(2021, 2025), resim: lf("Dacia", "Logan Mk3") },
        ],
      },
      {
        model: "Duster",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2010, 2017), resim: lf("Dacia", "Duster Mk1") },
          { kod: "Mk2", yillar: yillar(2017, 2024), resim: lf("Dacia", "Duster Mk2") },
          { kod: "Mk3", yillar: yillar(2024, 2025), resim: lf("Dacia", "Duster Mk3") },
        ],
      },
      {
        model: "Spring",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2021, 2025), resim: lf("Dacia", "Spring 1") },
        ],
      },
    ],
  },
  {
    marka: "Nissan",
    modeller: [
      {
        model: "Qashqai",
        kasalar: [
          { kod: "J10", yillar: yillar(2006, 2013), resim: lf("Nissan", "Qashqai J10") },
          { kod: "J11", yillar: yillar(2013, 2021), resim: lf("Nissan", "Qashqai J11") },
          { kod: "J12", yillar: yillar(2021, 2025), resim: lf("Nissan", "Qashqai J12") },
        ],
      },
      {
        model: "Micra",
        kasalar: [
          { kod: "K12", yillar: yillar(2002, 2010), resim: lf("Nissan", "Micra K12") },
          { kod: "K13", yillar: yillar(2010, 2016), resim: lf("Nissan", "Micra K13") },
          { kod: "K14", yillar: yillar(2016, 2023), resim: lf("Nissan", "Micra K14") },
        ],
      },
      {
        model: "Juke",
        kasalar: [
          { kod: "F15", yillar: yillar(2010, 2019), resim: lf("Nissan", "Juke F15") },
          { kod: "F16", yillar: yillar(2019, 2025), resim: lf("Nissan", "Juke F16") },
        ],
      },
    ],
  },
  {
    marka: "Opel",
    modeller: [
      {
        model: "Astra",
        kasalar: [
          { kod: "G", yillar: yillar(1998, 2009), resim: lf("Opel", "Astra G") },
          { kod: "H", yillar: yillar(2004, 2009), resim: lf("Opel", "Astra H") },
          { kod: "J", yillar: yillar(2009, 2015), resim: lf("Opel", "Astra J") },
          { kod: "K", yillar: yillar(2015, 2021), resim: lf("Opel", "Astra K") },
          { kod: "L", yillar: yillar(2021, 2025), resim: lf("Opel", "Astra L") },
        ],
      },
      {
        model: "Corsa",
        kasalar: [
          { kod: "C", yillar: yillar(2000, 2006), resim: lf("Opel", "Corsa C") },
          { kod: "D", yillar: yillar(2006, 2014), resim: lf("Opel", "Corsa D") },
          { kod: "E", yillar: yillar(2014, 2019), resim: lf("Opel", "Corsa E") },
          { kod: "F", yillar: yillar(2019, 2025), resim: lf("Opel", "Corsa F") },
        ],
      },
      {
        model: "Mokka",
        kasalar: [
          { kod: "A", yillar: yillar(2012, 2020), resim: lf("Opel", "Mokka A") },
          { kod: "B", yillar: yillar(2020, 2025), resim: lf("Opel", "Mokka B") },
        ],
      },
      {
        model: "Insignia",
        kasalar: [
          { kod: "A", yillar: yillar(2008, 2017), resim: lf("Opel", "Insignia A") },
          { kod: "B", yillar: yillar(2017, 2025), resim: lf("Opel", "Insignia B") },
        ],
      },
    ],
  },
  {
    marka: "Honda",
    modeller: [
      {
        model: "Civic",
        kasalar: [
          { kod: "Mk7", yillar: yillar(2000, 2005), resim: lf("Honda", "Civic Mk7") },
          { kod: "Mk8", yillar: yillar(2005, 2011), resim: lf("Honda", "Civic Mk8") },
          { kod: "Mk9", yillar: yillar(2011, 2017), resim: lf("Honda", "Civic Mk9") },
          { kod: "Mk10", yillar: yillar(2017, 2021), resim: lf("Honda", "Civic Mk10") },
          { kod: "Mk11", yillar: yillar(2021, 2025), resim: lf("Honda", "Civic Mk11") },
        ],
      },
      {
        model: "HR-V",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2014, 2021), resim: lf("Honda", "HR-V Mk2") },
          { kod: "Mk3", yillar: yillar(2021, 2025), resim: lf("Honda", "HR-V Mk3") },
        ],
      },
      {
        model: "CR-V",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2006, 2011), resim: lf("Honda", "CR-V Mk3") },
          { kod: "Mk4", yillar: yillar(2011, 2016), resim: lf("Honda", "CR-V Mk4") },
          { kod: "Mk5", yillar: yillar(2016, 2022), resim: lf("Honda", "CR-V Mk5") },
          { kod: "Mk6", yillar: yillar(2022, 2025), resim: lf("Honda", "CR-V Mk6") },
        ],
      },
    ],
  },
  {
    marka: "Mitsubishi",
    modeller: [
      {
        model: "Colt",
        kasalar: [
          { kod: "Z30", yillar: yillar(2004, 2012), resim: lf("Mitsubishi", "Colt Z30") },
        ],
      },
      {
        model: "Outlander",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2006, 2012), resim: lf("Mitsubishi", "Outlander Mk2") },
          { kod: "Mk3", yillar: yillar(2012, 2022), resim: lf("Mitsubishi", "Outlander Mk3") },
          { kod: "Mk4", yillar: yillar(2022, 2025), resim: lf("Mitsubishi", "Outlander Mk4") },
        ],
      },
      {
        model: "ASX",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2010, 2021), resim: lf("Mitsubishi", "ASX Mk1") },
          { kod: "Mk2", yillar: yillar(2022, 2025), resim: lf("Mitsubishi", "ASX Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Mazda",
    modeller: [
      {
        model: "3",
        kasalar: [
          { kod: "BK", yillar: yillar(2003, 2009), resim: lf("Mazda", "3 BK") },
          { kod: "BL", yillar: yillar(2009, 2013), resim: lf("Mazda", "3 BL") },
          { kod: "BM", yillar: yillar(2013, 2018), resim: lf("Mazda", "3 BM") },
          { kod: "BP", yillar: yillar(2018, 2025), resim: lf("Mazda", "3 BP") },
        ],
      },
      {
        model: "6",
        kasalar: [
          { kod: "GG", yillar: yillar(2002, 2007), resim: lf("Mazda", "6 GG") },
          { kod: "GH", yillar: yillar(2007, 2012), resim: lf("Mazda", "6 GH") },
          { kod: "GJ", yillar: yillar(2012, 2025), resim: lf("Mazda", "6 GJ") },
        ],
      },
      {
        model: "CX-5",
        kasalar: [
          { kod: "KE", yillar: yillar(2012, 2017), resim: lf("Mazda", "CX-5 KE") },
          { kod: "KF", yillar: yillar(2017, 2025), resim: lf("Mazda", "CX-5 KF") },
        ],
      },
    ],
  },
  {
    marka: "Volvo",
    modeller: [
      {
        model: "V40",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2012, 2019), resim: lf("Volvo", "V40 Mk2") },
        ],
      },
      {
        model: "XC60",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2008, 2017), resim: lf("Volvo", "XC60 Mk1") },
          { kod: "Mk2", yillar: yillar(2017, 2025), resim: lf("Volvo", "XC60 Mk2") },
        ],
      },
      {
        model: "XC40",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2017, 2025), resim: lf("Volvo", "XC40 Mk1") },
        ],
      },
    ],
  },
  {
    marka: "TOGG",
    modeller: [
      {
        model: "T10X",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2023, 2025), resim: wm("TOGG_T10X.jpg") },
        ],
      },
      {
        model: "T10F",
        kasalar: [
          { kod: "1.Nesil", yillar: yillar(2024, 2025), resim: lf("TOGG", "T10F 1") },
        ],
      },
    ],
  },
  {
    marka: "Alfa Romeo",
    modeller: [
      {
        model: "Giulietta",
        kasalar: [
          { kod: "940", yillar: yillar(2010, 2021), resim: lf("Alfa Romeo", "Giulietta 940") },
        ],
      },
      {
        model: "Giulia",
        kasalar: [
          { kod: "952", yillar: yillar(2016, 2025), resim: lf("Alfa Romeo", "Giulia 952") },
        ],
      },
      {
        model: "Stelvio",
        kasalar: [
          { kod: "949", yillar: yillar(2017, 2025), resim: lf("Alfa Romeo", "Stelvio 949") },
        ],
      },
    ],
  },
  {
    marka: "Mini",
    modeller: [
      {
        model: "Hatch",
        kasalar: [
          { kod: "R50/R53", yillar: yillar(2001, 2006), resim: lf("Mini", "Hatch R50") },
          { kod: "R56", yillar: yillar(2006, 2013), resim: lf("Mini", "Hatch R56") },
          { kod: "F56", yillar: yillar(2013, 2021), resim: lf("Mini", "Hatch F56") },
          { kod: "F66", yillar: yillar(2024, 2025), resim: lf("Mini", "Hatch F66") },
        ],
      },
      {
        model: "Countryman",
        kasalar: [
          { kod: "R60", yillar: yillar(2010, 2016), resim: lf("Mini", "Countryman R60") },
          { kod: "F60", yillar: yillar(2016, 2024), resim: lf("Mini", "Countryman F60") },
          { kod: "U25", yillar: yillar(2024, 2025), resim: lf("Mini", "Countryman U25") },
        ],
      },
    ],
  },
  {
    marka: "Jeep",
    modeller: [
      {
        model: "Renegade",
        kasalar: [
          { kod: "BU", yillar: yillar(2014, 2025), resim: lf("Jeep", "Renegade BU") },
        ],
      },
      {
        model: "Compass",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2017, 2025), resim: lf("Jeep", "Compass Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Land Rover",
    modeller: [
      {
        model: "Discovery Sport",
        kasalar: [
          { kod: "L550", yillar: yillar(2014, 2025), resim: lf("Land Rover", "Discovery Sport L550") },
        ],
      },
      {
        model: "Range Rover Evoque",
        kasalar: [
          { kod: "L538", yillar: yillar(2011, 2018), resim: lf("Land Rover", "Evoque L538") },
          { kod: "L551", yillar: yillar(2019, 2025), resim: lf("Land Rover", "Evoque L551") },
        ],
      },
    ],
  },
  {
    marka: "Subaru",
    modeller: [
      {
        model: "Forester",
        kasalar: [
          { kod: "SH", yillar: yillar(2007, 2013), resim: lf("Subaru", "Forester SH") },
          { kod: "SJ", yillar: yillar(2013, 2018), resim: lf("Subaru", "Forester SJ") },
          { kod: "SK", yillar: yillar(2018, 2025), resim: lf("Subaru", "Forester SK") },
        ],
      },
      {
        model: "Outback",
        kasalar: [
          { kod: "BH", yillar: yillar(1999, 2003), resim: lf("Subaru", "Outback BH") },
          { kod: "BP", yillar: yillar(2003, 2009), resim: lf("Subaru", "Outback BP") },
          { kod: "BR", yillar: yillar(2009, 2014), resim: lf("Subaru", "Outback BR") },
          { kod: "BS", yillar: yillar(2014, 2021), resim: lf("Subaru", "Outback BS") },
          { kod: "BT", yillar: yillar(2021, 2025), resim: lf("Subaru", "Outback BT") },
        ],
      },
    ],
  },
  {
    marka: "Suzuki",
    modeller: [
      {
        model: "Swift",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2004, 2010), resim: lf("Suzuki", "Swift Mk2") },
          { kod: "Mk3", yillar: yillar(2010, 2017), resim: lf("Suzuki", "Swift Mk3") },
          { kod: "Mk4", yillar: yillar(2017, 2025), resim: lf("Suzuki", "Swift Mk4") },
        ],
      },
      {
        model: "Vitara",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2015, 2025), resim: lf("Suzuki", "Vitara Mk3") },
        ],
      },
      {
        model: "S-Cross",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2013, 2021), resim: lf("Suzuki", "S-Cross Mk1") },
          { kod: "Mk2", yillar: yillar(2021, 2025), resim: lf("Suzuki", "S-Cross Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Porsche",
    modeller: [
      {
        model: "Cayenne",
        kasalar: [
          { kod: "9PA", yillar: yillar(2002, 2010), resim: lf("Porsche", "Cayenne 9PA") },
          { kod: "92A", yillar: yillar(2010, 2018), resim: lf("Porsche", "Cayenne 92A") },
          { kod: "PO536", yillar: yillar(2018, 2025), resim: lf("Porsche", "Cayenne PO536") },
        ],
      },
      {
        model: "Macan",
        kasalar: [
          { kod: "95B", yillar: yillar(2013, 2024), resim: lf("Porsche", "Macan 95B") },
          { kod: "J1", yillar: yillar(2024, 2025), resim: lf("Porsche", "Macan J1") },
        ],
      },
    ],
  },
];

export const MOTOSIKLET_MARKALARI: Marka[] = [
  {
    marka: "Honda",
    modeller: [
      {
        model: "CB500F",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2013, 2018), resim: lf("Honda Moto", "CB500F Mk1") },
          { kod: "Mk2", yillar: yillar(2019, 2025), resim: lf("Honda Moto", "CB500F Mk2") },
        ],
      },
      {
        model: "CBR500R",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2013, 2018), resim: lf("Honda Moto", "CBR500R Mk1") },
          { kod: "Mk2", yillar: yillar(2019, 2025), resim: lf("Honda Moto", "CBR500R Mk2") },
        ],
      },
      {
        model: "CB650R",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2019, 2025), resim: lf("Honda Moto", "CB650R") },
        ],
      },
      {
        model: "Africa Twin",
        kasalar: [
          { kod: "CRF1000L", yillar: yillar(2016, 2019), resim: lf("Honda Moto", "Africa Twin CRF1000L") },
          { kod: "CRF1100L", yillar: yillar(2020, 2025), resim: lf("Honda Moto", "Africa Twin CRF1100L") },
        ],
      },
      {
        model: "PCX125",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2018, 2020), resim: lf("Honda Moto", "PCX125 Mk3") },
          { kod: "Mk4", yillar: yillar(2021, 2025), resim: lf("Honda Moto", "PCX125 Mk4") },
        ],
      },
    ],
  },
  {
    marka: "Yamaha",
    modeller: [
      {
        model: "MT-07",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2014, 2020), resim: lf("Yamaha Moto", "MT-07 Mk1") },
          { kod: "Mk2", yillar: yillar(2021, 2025), resim: lf("Yamaha Moto", "MT-07 Mk2") },
        ],
      },
      {
        model: "MT-09",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2013, 2016), resim: lf("Yamaha Moto", "MT-09 Mk1") },
          { kod: "Mk2", yillar: yillar(2017, 2020), resim: lf("Yamaha Moto", "MT-09 Mk2") },
          { kod: "Mk3", yillar: yillar(2021, 2025), resim: lf("Yamaha Moto", "MT-09 Mk3") },
        ],
      },
      {
        model: "R1",
        kasalar: [
          { kod: "5VY", yillar: yillar(2004, 2006), resim: lf("Yamaha Moto", "R1 5VY") },
          { kod: "4C8", yillar: yillar(2007, 2008), resim: lf("Yamaha Moto", "R1 4C8") },
          { kod: "14B", yillar: yillar(2009, 2014), resim: lf("Yamaha Moto", "R1 14B") },
          { kod: "RN32", yillar: yillar(2015, 2025), resim: lf("Yamaha Moto", "R1 RN32") },
        ],
      },
      {
        model: "XMAX 300",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2017, 2025), resim: lf("Yamaha Moto", "XMAX 300") },
        ],
      },
      {
        model: "Tracer 9",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2021, 2025), resim: lf("Yamaha Moto", "Tracer 9") },
        ],
      },
    ],
  },
  {
    marka: "Kawasaki",
    modeller: [
      {
        model: "Z650",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2017, 2025), resim: lf("Kawasaki Moto", "Z650") },
        ],
      },
      {
        model: "Z900",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2017, 2025), resim: lf("Kawasaki Moto", "Z900") },
        ],
      },
      {
        model: "Ninja 400",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2018, 2025), resim: lf("Kawasaki Moto", "Ninja 400") },
        ],
      },
      {
        model: "Ninja 650",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2017, 2025), resim: lf("Kawasaki Moto", "Ninja 650") },
        ],
      },
      {
        model: "Versys 650",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2015, 2025), resim: lf("Kawasaki Moto", "Versys 650") },
        ],
      },
    ],
  },
  {
    marka: "Suzuki",
    modeller: [
      {
        model: "GSX-S750",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2015, 2022), resim: lf("Suzuki Moto", "GSX-S750") },
        ],
      },
      {
        model: "V-Strom 650",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2012, 2025), resim: lf("Suzuki Moto", "V-Strom 650 Mk2") },
        ],
      },
      {
        model: "SV650",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2016, 2025), resim: lf("Suzuki Moto", "SV650 Mk3") },
        ],
      },
    ],
  },
  {
    marka: "BMW Motorrad",
    modeller: [
      {
        model: "F900R",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2020, 2025), resim: lf("BMW Motorrad", "F900R") },
        ],
      },
      {
        model: "R1250GS",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2019, 2025), resim: lf("BMW Motorrad", "R1250GS") },
        ],
      },
      {
        model: "S1000RR",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2009, 2018), resim: lf("BMW Motorrad", "S1000RR Mk1") },
          { kod: "Mk2", yillar: yillar(2019, 2025), resim: lf("BMW Motorrad", "S1000RR Mk2") },
        ],
      },
    ],
  },
  {
    marka: "KTM",
    modeller: [
      {
        model: "Duke 390",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2012, 2016), resim: lf("KTM Moto", "Duke 390 Mk1") },
          { kod: "Mk2", yillar: yillar(2017, 2022), resim: lf("KTM Moto", "Duke 390 Mk2") },
          { kod: "Mk3", yillar: yillar(2023, 2025), resim: lf("KTM Moto", "Duke 390 Mk3") },
        ],
      },
      {
        model: "790 Duke",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2018, 2025), resim: lf("KTM Moto", "790 Duke") },
        ],
      },
      {
        model: "890 Adventure",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2021, 2025), resim: lf("KTM Moto", "890 Adventure") },
        ],
      },
    ],
  },
  {
    marka: "Ducati",
    modeller: [
      {
        model: "Monster",
        kasalar: [
          { kod: "797", yillar: yillar(2017, 2020), resim: lf("Ducati Moto", "Monster 797") },
          { kod: "937", yillar: yillar(2021, 2025), resim: lf("Ducati Moto", "Monster 937") },
        ],
      },
      {
        model: "Panigale V2",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2020, 2025), resim: lf("Ducati Moto", "Panigale V2") },
        ],
      },
    ],
  },
  {
    marka: "Royal Enfield",
    modeller: [
      {
        model: "Meteor 350",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2020, 2025), resim: lf("Royal Enfield", "Meteor 350") },
        ],
      },
      {
        model: "Himalayan",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2016, 2022), resim: lf("Royal Enfield", "Himalayan Mk1") },
          { kod: "Mk2", yillar: yillar(2023, 2025), resim: lf("Royal Enfield", "Himalayan Mk2") },
        ],
      },
      {
        model: "Interceptor 650",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2018, 2025), resim: lf("Royal Enfield", "Interceptor 650") },
        ],
      },
    ],
  },
];

export const TICARI_MARKALARI: Marka[] = [
  {
    marka: "Ford",
    modeller: [
      {
        model: "Transit",
        kasalar: [
          { kod: "Mk6", yillar: yillar(2000, 2006), resim: lf("Ford Ticari", "Transit Mk6") },
          { kod: "Mk7", yillar: yillar(2006, 2013), resim: lf("Ford Ticari", "Transit Mk7") },
          { kod: "Mk8", yillar: yillar(2013, 2025), resim: lf("Ford Ticari", "Transit Mk8") },
        ],
      },
      {
        model: "Transit Custom",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2012, 2023), resim: lf("Ford Ticari", "Transit Custom Mk1") },
          { kod: "Mk2", yillar: yillar(2023, 2025), resim: lf("Ford Ticari", "Transit Custom Mk2") },
        ],
      },
      {
        model: "Transit Connect",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2002, 2013), resim: lf("Ford Ticari", "Transit Connect Mk1") },
          { kod: "Mk2", yillar: yillar(2013, 2025), resim: lf("Ford Ticari", "Transit Connect Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Volkswagen",
    modeller: [
      {
        model: "Transporter",
        kasalar: [
          { kod: "T5", yillar: yillar(2003, 2015), resim: lf("VW Ticari", "Transporter T5") },
          { kod: "T6", yillar: yillar(2015, 2025), resim: lf("VW Ticari", "Transporter T6") },
        ],
      },
      {
        model: "Caddy",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2004, 2015), resim: lf("VW Ticari", "Caddy Mk3") },
          { kod: "Mk4", yillar: yillar(2015, 2021), resim: lf("VW Ticari", "Caddy Mk4") },
          { kod: "Mk5", yillar: yillar(2021, 2025), resim: lf("VW Ticari", "Caddy Mk5") },
        ],
      },
      {
        model: "Crafter",
        kasalar: [
          { kod: "Mk1", yillar: yillar(2006, 2016), resim: lf("VW Ticari", "Crafter Mk1") },
          { kod: "Mk2", yillar: yillar(2016, 2025), resim: lf("VW Ticari", "Crafter Mk2") },
        ],
      },
    ],
  },
  {
    marka: "Mercedes-Benz",
    modeller: [
      {
        model: "Sprinter",
        kasalar: [
          { kod: "W901-905", yillar: yillar(1995, 2006), resim: lf("MB Ticari", "Sprinter W901") },
          { kod: "W906", yillar: yillar(2006, 2018), resim: lf("MB Ticari", "Sprinter W906") },
          { kod: "W907", yillar: yillar(2018, 2025), resim: lf("MB Ticari", "Sprinter W907") },
        ],
      },
      {
        model: "Vito",
        kasalar: [
          { kod: "W638", yillar: yillar(1996, 2003), resim: lf("MB Ticari", "Vito W638") },
          { kod: "W639", yillar: yillar(2003, 2014), resim: lf("MB Ticari", "Vito W639") },
          { kod: "W447", yillar: yillar(2014, 2025), resim: lf("MB Ticari", "Vito W447") },
        ],
      },
      {
        model: "Citan",
        kasalar: [
          { kod: "W415", yillar: yillar(2012, 2021), resim: lf("MB Ticari", "Citan W415") },
          { kod: "W420", yillar: yillar(2021, 2025), resim: lf("MB Ticari", "Citan W420") },
        ],
      },
    ],
  },
  {
    marka: "Renault",
    modeller: [
      {
        model: "Master",
        kasalar: [
          { kod: "Mk2", yillar: yillar(1998, 2010), resim: lf("Renault Ticari", "Master Mk2") },
          { kod: "Mk3", yillar: yillar(2010, 2025), resim: lf("Renault Ticari", "Master Mk3") },
        ],
      },
      {
        model: "Trafic",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2001, 2014), resim: lf("Renault Ticari", "Trafic Mk2") },
          { kod: "Mk3", yillar: yillar(2014, 2025), resim: lf("Renault Ticari", "Trafic Mk3") },
        ],
      },
      {
        model: "Kangoo",
        kasalar: [
          { kod: "Mk1", yillar: yillar(1997, 2007), resim: lf("Renault Ticari", "Kangoo Mk1") },
          { kod: "Mk2", yillar: yillar(2007, 2021), resim: lf("Renault Ticari", "Kangoo Mk2") },
          { kod: "Mk3", yillar: yillar(2021, 2025), resim: lf("Renault Ticari", "Kangoo Mk3") },
        ],
      },
    ],
  },
  {
    marka: "Peugeot",
    modeller: [
      {
        model: "Boxer",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2006, 2025), resim: lf("Peugeot Ticari", "Boxer Mk2") },
        ],
      },
      {
        model: "Partner",
        kasalar: [
          { kod: "Mk1", yillar: yillar(1996, 2008), resim: lf("Peugeot Ticari", "Partner Mk1") },
          { kod: "Mk2", yillar: yillar(2008, 2018), resim: lf("Peugeot Ticari", "Partner Mk2") },
          { kod: "Mk3", yillar: yillar(2018, 2025), resim: lf("Peugeot Ticari", "Partner Mk3") },
        ],
      },
      {
        model: "Expert",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2007, 2016), resim: lf("Peugeot Ticari", "Expert Mk2") },
          { kod: "Mk3", yillar: yillar(2016, 2025), resim: lf("Peugeot Ticari", "Expert Mk3") },
        ],
      },
    ],
  },
  {
    marka: "Citroën",
    modeller: [
      {
        model: "Jumper",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2006, 2025), resim: lf("Citroën Ticari", "Jumper Mk2") },
        ],
      },
      {
        model: "Berlingo",
        kasalar: [
          { kod: "Mk1", yillar: yillar(1996, 2008), resim: lf("Citroën Ticari", "Berlingo Mk1") },
          { kod: "Mk2", yillar: yillar(2008, 2018), resim: lf("Citroën Ticari", "Berlingo Mk2") },
          { kod: "Mk3", yillar: yillar(2018, 2025), resim: lf("Citroën Ticari", "Berlingo Mk3") },
        ],
      },
      {
        model: "Dispatch",
        kasalar: [
          { kod: "Mk2", yillar: yillar(2007, 2016), resim: lf("Citroën Ticari", "Dispatch Mk2") },
          { kod: "Mk3", yillar: yillar(2016, 2025), resim: lf("Citroën Ticari", "Dispatch Mk3") },
        ],
      },
    ],
  },
  {
    marka: "Fiat",
    modeller: [
      {
        model: "Ducato",
        kasalar: [
          { kod: "Mk3", yillar: yillar(1994, 2006), resim: lf("Fiat Ticari", "Ducato Mk3") },
          { kod: "Mk4", yillar: yillar(2006, 2025), resim: lf("Fiat Ticari", "Ducato Mk4") },
        ],
      },
      {
        model: "Fiorino",
        kasalar: [
          { kod: "Mk3", yillar: yillar(2007, 2025), resim: lf("Fiat Ticari", "Fiorino Mk3") },
        ],
      },
      {
        model: "Scudo",
        kasalar: [
          { kod: "Mk1", yillar: yillar(1995, 2007), resim: lf("Fiat Ticari", "Scudo Mk1") },
          { kod: "Mk2", yillar: yillar(2007, 2016), resim: lf("Fiat Ticari", "Scudo Mk2") },
          { kod: "Mk3", yillar: yillar(2021, 2025), resim: lf("Fiat Ticari", "Scudo Mk3") },
        ],
      },
    ],
  },
  {
    marka: "Iveco",
    modeller: [
      {
        model: "Daily",
        kasalar: [
          { kod: "4.Nesil", yillar: yillar(1999, 2006), resim: lf("Iveco Ticari", "Daily 4") },
          { kod: "5.Nesil", yillar: yillar(2006, 2014), resim: lf("Iveco Ticari", "Daily 5") },
          { kod: "6.Nesil", yillar: yillar(2014, 2025), resim: lf("Iveco Ticari", "Daily 6") },
        ],
      },
    ],
  },
];

export function markalariGetir(kategori: "OTOMOBIL" | "MOTOSIKLET" | "TICARI"): Marka[] {
  if (kategori === "OTOMOBIL") return OTOMOBIL_MARKALARI;
  if (kategori === "MOTOSIKLET") return MOTOSIKLET_MARKALARI;
  return TICARI_MARKALARI;
}

export function kasayiBul(marka: string, model: string, yil: number): Kasa | undefined {
  const tumMarkalar = [...OTOMOBIL_MARKALARI, ...MOTOSIKLET_MARKALARI, ...TICARI_MARKALARI];
  const markaObj = tumMarkalar.find((m) => m.marka === marka);
  if (!markaObj) return undefined;
  const modelObj = markaObj.modeller.find((m) => m.model === model);
  if (!modelObj) return undefined;
  return modelObj.kasalar.find((k) => k.yillar.includes(yil));
}
