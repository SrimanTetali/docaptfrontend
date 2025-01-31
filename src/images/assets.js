
export const assets = {
  // Cloudinary URLs for doctor images
  Doc1Rechard: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994746/Doc1Rechard_mx5e5k.jpg',
  Doc2Emma: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994746/Doc2Emma_y1pffv.jpg',
  Doc3Alex: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994745/Doc3Alex_eqgtyi.jpg',
  Doc4Emily: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994746/Doc4Emily_filter.webp',
  Doc5Sarah: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994746/Doc5Sarah_jwfrz5.webp',
  Doc6Megan: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994744/Doc6Megan_lunfsc.webp',
  Doc7Chris: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994744/Doc7Chris_drmlha.webp',
  Doc8Olivia: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994743/Doc8Olivia_aiuk9j.avif',
  Doc9Micheal: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994742/Doc9Micheal_ztls8u.avif',
  Doc10Daniel: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994743/Doc10Daniel_h7f7pv.avif',
  Doc11Sophie: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994747/Doc11Sophie_wt7xoz.avif',
  Doc12Hannah: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994744/Doc12Hannah_yvnxzm.avif',
  Doc13Kevin: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994744/Doc13Kevin_fnkghf.jpg',
  Doc14Rachel: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994743/Doc14Rachel_lmfsqe.avif',
  Doc15Matthew: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994742/Doc15Matthew_e3dilv.jpg',
  Doc16Laura: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994743/Doc16Laura_kuxsit.avif',
  Doc17Ethan: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994746/Doc17Ethan_d3hfk8.webp',
  Doc18Natalie: 'https://res.cloudinary.com/dagj68nid/image/upload/v1737994743/Doc18Natalie_wobfy0.avif',

  // Other assets
  HomePageBG: './Home/HomeBg.png',
  Facebook: './Followus/facebook.png',
  Instagram: './Followus/instagram.jpeg',
  Linkedin: './Followus/linkedin.png',
  Twitter: './Followus/Twitter.png',
  ContactPageBG: './Home/contact/Contact.png',
  Email: './Home/contact/email.jpeg',
  Phone: './Home/contact/phone.jpeg',
  Whatsapp: './Home/contact/whatsapp.jpeg',

  Cardilogy: './Home/specialities/cardiology.jpg',
  Dermatology: './Home/specialities/Dermatology.jpeg',
  Gastroenterology: './Home/specialities/Gastroenterology.jpeg',
  Neurology: './Home/specialities/Neurology.jpeg',
  Ophthalmology: './Home/specialities/Ophthalmology.jpeg',
  Orthodontist: './Home/specialities/orthodontist.jpg',
  Orthopedics: './Home/specialities/orthopedics.jpeg',
  Pediatrics: './Home/specialities/pediatrics.jpg',
  General_Physician: './Home/specialities/GeneralPhysician.jpg',

  EmailIcon: './icons/email.png',
  EyeIcon: './icons/eye.png',
  EyeSlashIcon: './icons/eye-slash.png',
  PasswordIcon: './icons/password.png',
  PersonIcon: './icons/person.png',
  PhoneIcon: './icons/phone.png',
};

const specialities = [
  { name: 'General physician', key: 'General_Physician' },
  { name: 'Cardiologist', key: 'Cardilogy' },
  { name: 'Dermatologist', key: 'Dermatology' },
  { name: 'Gastroenterologist', key: 'Gastroenterology' },
  { name: 'Neurologist', key: 'Neurology' },
  { name: 'Ophthalmologist', key: 'Ophthalmology' },
  { name: 'Orthodontist', key: 'Orthodontist' },
  { name: 'Orthopedist', key: 'Orthopedics' },
  { name: 'Pediatrician', key: 'Pediatrics' },
];

export const specialityData = specialities.map(({ name, key }) => ({
  speciality: name,
  image: assets[key],
}));
export const doctors = [
  // General Physicians
  {
    _id: 'doc1',
    name: 'Dr. Richard James',
    image: assets.Doc1Rechard, // Reference from assets
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. James is dedicated to providing the best general healthcare services.',
    fees: 50,
    address: {
      city: 'London',
      street: '17th Cross, Richmond Circle, Ring Road',
    },
    email: 'richard.james@gmail.com', // Updated email format
  },
  {
    _id: 'doc2',
    name: 'Dr. Emma Watson',
    image: assets.Doc2Emma, // Reference from assets
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '7 Years',
    about: 'Dr. Watson specializes in general medical care and health management.',
    fees: 60,
    address: {
      city: 'Manchester',
      street: '45 Pine Avenue, Greenway, Manchester',
    },
    email: 'emma.watson@gmail.com', // Updated email format
  },
  {
    _id: 'doc3',
    name: 'Dr. Alex Brown',
    image: assets.Doc3Alex, // Reference from assets
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '5 Years',
    about: 'Dr. Brown is highly skilled in diagnosing and treating common ailments.',
    fees: 55,
    address: {
      city: 'Birmingham',
      street: '29 Grove Street, Hilltop, Birmingham',
    },
    email: 'alex.brown@gmail.com', // Updated email format
  },

  // Gynecologists
  {
    _id: 'doc4',
    name: 'Dr. Emily Larson',
    image: assets.Doc4Emily, // Reference from assets
    speciality: 'Gynecologist',
    degree: 'MBBS, MD',
    experience: '10 Years',
    about: 'Dr. Larson provides expert gynecological care with a personal touch.',
    fees: 70,
    address: {
      city: 'Cambridge',
      street: '8 Lotus Lane, Downtown, Cambridge',
    },
    email: 'emily.larson@gmail.com', // Updated email format
  },
  {
    _id: 'doc5',
    name: 'Dr. Sarah Thompson',
    image: assets.Doc5Sarah, // Reference from assets
    speciality: 'Gynecologist',
    degree: 'MBBS, DGO',
    experience: '8 Years',
    about: 'Dr. Thompson specializes in women’s health and reproductive care.',
    fees: 65,
    address: {
      city: 'Bristol',
      street: '14 Garden Path, North Avenue, Bristol',
    },
    email: 'sarah.thompson@gmail.com', // Updated email format
  },
  {
    _id: 'doc6',
    name: 'Dr. Megan Parker',
    image: assets.Doc6Megan, // Reference from assets
    speciality: 'Gynecologist',
    degree: 'MBBS, MS',
    experience: '12 Years',
    about: 'Dr. Parker has vast expertise in high-risk pregnancies and fertility.',
    fees: 80,
    address: {
      city: 'Liverpool',
      street: '56 Rosewood Drive, Parkview, Liverpool',
    },
    email: 'megan.parker@gmail.com', // Updated email format
  },

  // Dermatologists
  {
    _id: 'doc7',
    name: 'Dr. Chris Williams',
    image: assets.Doc7Chris, // Reference from assets
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Dr. Williams is an expert in treating skin, hair, and nail disorders.',
    fees: 70,
    address: {
      city: 'Leeds',
      street: '10 Maple Street, City Center, Leeds',
    },
    email: 'chris.williams@gmail.com', // Updated email format
  },
  {
    _id: 'doc8',
    name: 'Dr. Olivia Clark',
    image: assets.Doc8Olivia, // Reference from assets
    speciality: 'Dermatologist',
    degree: 'MBBS, DDVL',
    experience: '9 Years',
    about: 'Dr. Clark offers personalized skincare and aesthetic treatments.',
    fees: 75,
    address: {
      city: 'Glasgow',
      street: '33 Sunset Boulevard, Old Town, Glasgow',
    },
    email: 'olivia.clark@gmail.com', // Updated email format
  },
  {
    _id: 'doc9',
    name: 'Dr. Michael Adams',
    image: assets.Doc9Micheal, // Reference from assets
    speciality: 'Dermatologist',
    degree: 'MBBS, MD',
    experience: '11 Years',
    about: 'Dr. Adams specializes in advanced dermatological care and surgery.',
    fees: 85,
    address: {
      city: 'Edinburgh',
      street: '22 Birchwood Lane, Riverside, Edinburgh',
    },
    email: 'michael.adams@gmail.com', // Updated email format
  },

  // Pediatricians
  {
    _id: 'doc10',
    name: 'Dr. Daniel Roberts',
    image: assets.Doc10Daniel, // Reference from assets
    speciality: 'Pediatrician',
    degree: 'MBBS, MD',
    experience: '7 Years',
    about: 'Dr. Roberts is dedicated to providing excellent care for children.',
    fees: 65,
    address: {
      city: 'Cardiff',
      street: '12 Willow Road, Main Street, Cardiff',
    },
    email: 'daniel.roberts@gmail.com', // Updated email format
  },
  {
    _id: 'doc11',
    name: 'Dr. Sophie Miller',
    image: assets.Doc11Sophie, // Reference from assets
    speciality: 'Pediatrician',
    degree: 'MBBS, DCH',
    experience: '5 Years',
    about: 'Dr. Miller focuses on child health and preventive care.',
    fees: 60,
    address: {
      city: 'Belfast',
      street: '9 Highland Avenue, West End, Belfast',
    },
    email: 'sophie.miller@gmail.com', // Updated email format
  },
  {
    _id: 'doc12',
    name: 'Dr. Hannah Taylor',
    image: assets.Doc12Hannah, // Reference from assets
    speciality: 'Pediatrician',
    degree: 'MBBS, MD',
    experience: '9 Years',
    about: 'Dr. Taylor ensures comprehensive health services for young patients.',
    fees: 70,
    address: {
      city: 'Nottingham',
      street: '18 Oak Street, East Park, Nottingham',
    },
    email: 'hannah.taylor@gmail.com', // Updated email format
  },

  // Neurologists
  {
    _id: 'doc13',
    name: 'Dr. Kevin Lewis',
    image: assets.Doc13Kevin, // Reference from assets
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '15 Years',
    about: 'Dr. Lewis specializes in treating neurological disorders with care.',
    fees: 100,
    address: {
      city: 'Sheffield',
      street: '21 Elm Road, Tech Valley, Sheffield',
    },
    email: 'kevin.lewis@gmail.com', // Updated email format
  },
  {
    _id: 'doc14',
    name: 'Dr. Rachel Green',
    image: assets.Doc14Rachel, // Reference from assets
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '12 Years',
    about: 'Dr. Green is an expert in neurodegenerative diseases.',
    fees: 95,
    address: {
      city: 'Oxford',
      street: '30 Riverwalk, Central Park, Oxford',
    },
    email: 'rachel.green@gmail.com', // Updated email format
  },
  {
    _id: 'doc15',
    name: 'Dr. Matthew Johnson',
    image: assets.Doc15Matthew, // Reference from assets
    speciality: 'Neurologist',
    degree: 'MBBS, DM',
    experience: '18 Years',
    about: 'Dr. Johnson provides innovative care for complex neurological cases.',
    fees: 110,
    address: {
      city: 'York',
      street: '48 Lakeview Drive, Meadow Way, York',
    },
    email: 'matthew.johnson@gmail.com', // Updated email format
  },

  // Gastroenterologists
  {
    _id: 'doc16',
    name: 'Dr. Laura Evans',
    image: assets.Doc16Laura, // Reference from assets
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '10 Years',
    about: 'Dr. Evans specializes in digestive health and gastroenterology.',
    fees: 90,
    address: {
      city: 'Plymouth',
      street: '50 Pebble Lane, Harborview, Plymouth',
    },
    email: 'laura.evans@gmail.com', // Updated email format
  },
  {
    _id: 'doc17',
    name: 'Dr. Ethan White',
    image: assets.Doc17Ethan, // Reference from assets
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '14 Years',
    about: 'Dr. White focuses on liver diseases and digestive disorders.',
    fees: 100,
    address: {
      city: 'Brighton',
      street: '7 Breeze Avenue, Seaside, Brighton',
    },
    email: 'ethan.white@gmail.com', // Updated email format
  },
  {
    _id: 'doc18',
    name: 'Dr. Natalie Hall',
    image: assets.Doc18Natalie, // Reference from assets
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM',
    experience: '12 Years',
    about: 'Dr. Hall offers endoscopy and advanced gastroenterology services.',
    fees: 95,
    address: {
      city: 'Southampton',
      street: '35 Orchard Drive, Lakeside, Southampton',
    },
    email: 'natalie.hall@gmail.com', // Updated email format
  },
];
