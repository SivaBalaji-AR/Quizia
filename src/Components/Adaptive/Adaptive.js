import React, { useState, useEffect } from 'react';
import Navigationbar from '../smallcomponents/Navbar';
import { useLocation } from 'react-router-dom';

const quizQuestions=[
  {
    "id": 1,
    "question": "What is the capital of Japan?",
    "options": ["Kyoto", "Nagoya", "Osaka", "Tokyo"],
    "correctOption": "Tokyo",
    "genres": ["Geography", "Asia", "Capitals"],
    "tag": "Introduction"
  },
  {
    "id": 2,
    "question": "Which element has the atomic number 1?",
    "options": ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    "correctOption": "Hydrogen",
    "genres": ["Chemistry", "Periodic Table", "Basics"],
    "tag": "Introduction"
  },
  {
    "id": 3,
    "question": "In which year did World War II end?",
    "options": ["1939", "1940", "1950", "1945"],
    "correctOption": "1945",
    "genres": ["History", "World War II", "20th Century"],
    "tag": "Introduction"
  },
  {
    "id": 4,
    "question": "What is the chemical formula for carbon dioxide?",
    "options": ["CO2", "NaCl", "O2", "H2O"],
    "correctOption": "CO2",
    "genres": ["Chemistry", "Molecules", "Formulas"],
    "tag": "Introduction"
  },
  {
    "id": 5,
    "question": "Which planet is known as the Red Planet?",
    "options": ["Venus", "Mars", "Jupiter", "Saturn"],
    "correctOption": "Mars",
    "genres": ["Astronomy", "Solar System", "Planets"],
    "tag": "Introduction"
  },
  {
    "id": 6,
    "question": "Who wrote 'To Kill a Mockingbird'?",
    "options": ["George Orwell", "Harper Lee", "J.K. Rowling", "Mark Twain"],
    "correctOption": "Harper Lee",
    "genres": ["Literature", "Novels", "American Authors"],
    "tag": "Introduction"
  },
  {
    "id": 7,
    "question": "What is the powerhouse of the cell?",
    "options": ["Nucleus", "Golgi Apparatus", "Ribosome", "Mitochondria"],
    "correctOption": "Mitochondria",
    "genres": ["Biology", "Cell Structure", "Basics"],
    "tag": "Introduction"
  },
  {
    "id": 8,
    "question": "Which country hosted the 2016 Summer Olympics?",
    "options": ["Japan", "China", "Germany", "Brazil"],
    "correctOption": "Brazil",
    "genres": ["Sports", "Olympics", "World Events"],
    "tag": "Introduction"
  },
  {
    "id": 9,
    "question": "What is the freezing point of water in Celsius?",
    "options": ["32°F", "0°C", "100°C", "-32°C"],
    "correctOption": "0°C",
    "genres": ["Physics", "Temperature", "Basics"],
    "tag": "Introduction"
  },
  {
    "id": 10,
    "question": "Who painted the Mona Lisa?",
    "options": ["Claude Monet", "Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
    "correctOption": "Leonardo da Vinci",
    "genres": ["Art", "Renaissance", "Masterpieces"],
    "tag": "Introduction"
  },
  {
    "id": 11,
    "question": "What is the chemical symbol for gold?",
    "options": ["Go", "Au", "Gd", "Ag"],
    "correctOption": "Au",
    "genres": ["Chemistry", "Elements", "Precious Metals"]
  },
  {
    "id": 12,
    "question": "Which country is known as the Land of the Rising Sun?",
    "options": ["Thailand", "China", "Japan", "South Korea"],
    "correctOption": "Japan",
    "genres": ["Geography", "Asia", "Countries"]
  },
  {
    "id": 13,
    "question": "What is the square root of 144?",
    "options": ["14", "18", "12", "16"],
    "correctOption": "12",
    "genres": ["Mathematics", "Algebra", "Basics"]
  },
  {
    "id": 14,
    "question": "Which planet has the most moons?",
    "options": ["Saturn", "Jupiter", "Uranus", "Neptune"],
    "correctOption": "Jupiter",
    "genres": ["Astronomy", "Solar System", "Planets"]
  },
  {
    "id": 15,
    "question": "Who developed the theory of relativity?",
    "options": ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
    "correctOption": "Albert Einstein",
    "genres": ["Physics", "Relativity", "Famous Scientists"]
  },
  {
    "id": 16,
    "question": "What is the largest mammal in the world?",
    "options": ["Elephant", "Rhino", "Giraffe", "Blue Whale"],
    "correctOption": "Blue Whale",
    "genres": ["Biology", "Animals", "Marine Life"]
  },
  {
    "id": 17,
    "question": "What is the longest river in the world?",
    "options": ["Mississippi", "Amazon", "Yangtze", "Nile"],
    "correctOption": "Nile",
    "genres": ["Geography", "Rivers", "World"]
  },
  {
    "id": 18,
    "question": "Who was the first person to walk on the moon?",
    "options": ["Buzz Aldrin", "Michael Collins", "Yuri Gagarin", "Neil Armstrong"],
    "correctOption": "Neil Armstrong",
    "genres": ["Space Exploration", "Astronauts", "1960s"]
  },
  {
    "id": 19,
    "question": "What is the most abundant gas in Earth's atmosphere?",
    "options": ["Hydrogen", "Carbon Dioxide", "Oxygen", "Nitrogen"],
    "correctOption": "Nitrogen",
    "genres": ["Earth Science", "Atmosphere", "Gases"]
  },
  {
    "id": 20,
    "question": "Which Shakespeare play features the characters Romeo and Juliet?",
    "options": ["Macbeth", "Hamlet", "Romeo and Juliet", "Othello"],
    "correctOption": "Romeo and Juliet",
    "genres": ["Literature", "Plays", "Shakespeare"]
  },
  {
    "id": 21,
    "question": "Which organ is responsible for pumping blood throughout the body?",
    "options": ["Kidneys", "Heart", "Liver", "Lungs"],
    "correctOption": "Heart",
    "genres": ["Biology", "Human Body", "Circulatory System"]
  },
  {
    "id": 22,
    "question": "What is the largest desert in the world?",
    "options": ["Arctic", "Sahara", "Kalahari", "Gobi"],
    "correctOption": "Sahara",
    "genres": ["Geography", "Deserts", "Africa"]
  },
  {
    "id": 23,
    "question": "Which composer is known for his 'Fifth Symphony'?",
    "options": ["Mozart", "Chopin", "Beethoven", "Bach"],
    "correctOption": "Beethoven",
    "genres": ["Music", "Classical", "Composers"]
  },
  {
    "id": 24,
    "question": "What is the primary language spoken in Brazil?",
    "options": ["French", "Portuguese", "Spanish", "English"],
    "correctOption": "Portuguese",
    "genres": ["Languages", "South America", "Culture"]
  },
  {
    "id": 25,
    "question": "What is the capital of Australia?",
    "options": ["Melbourne", "Sydney", "Perth", "Canberra"],
    "correctOption": "Canberra",
    "genres": ["Geography", "Oceania", "Capitals"]
  },
  {
    "id": 26,
    "question": "What is the boiling point of water at sea level in Celsius?",
    "options": ["0°C", "75°C", "100°C", "50°C"],
    "correctOption": "100°C",
    "genres": ["Physics", "Temperature", "Basics"]
  },
  {
    "id": 27,
    "question": "Who was the first president of the United States?",
    "options": ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
    "correctOption": "George Washington",
    "genres": ["History", "United States", "Presidents"]
  },
  {
    "id": 28,
    "question": "What is the currency of Japan?",
    "options": ["Won", "Dollar", "Euro", "Yen"],
    "correctOption": "Yen",
    "genres": ["Economics", "Asia", "Currencies"]
  },
  {
    "id": 29,
    "question": "Which artist painted the ceiling of the Sistine Chapel?",
    "options": ["Leonardo da Vinci", "Michelangelo", "Donatello", "Raphael"],
    "correctOption": "Michelangelo",
    "genres": ["Art", "Renaissance", "Masterpieces"]
  },
  {
    "id": 30,
    "question": "What is the most populous country in the world?",
    "options": ["Indonesia", "China", "United States", "India"],
    "correctOption": "China",
    "genres": ["Geography", "Population", "Countries"]
  }
]


const QQJEE = [
  { id: 1, question: "What is the chemical symbol for Sodium?", options: ["S", "Na", "Sn", "Si"], correctOption: "Na", genres: ["Chemistry", "Elements", "Basics"], tag: "Introduction" },
  { id: 2, question: "What is the derivative of sin(x) with respect to x?", options: ["-cos(x)", "cos(x)", "sin(x)", "-sin(x)"], correctOption: "cos(x)", genres: ["Mathematics", "Calculus", "Trigonometry"], tag: "Introduction" },
  { id: 3, question: "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?", options: ["Charles's Law", "Boyle's Law", "Gay-Lussac's Law", "Avogadro's Law"], correctOption: "Boyle's Law", genres: ["Physics", "Thermodynamics", "Gas Laws"], tag: "Introduction" },
  { id: 4, question: "What is the integral of 2x with respect to x?", options: ["2x^2 + C", "x^2", "x^2 + C", "2x"], correctOption: "x^2 + C", genres: ["Mathematics", "Calculus", "Integration"], tag: "Introduction" },
  { id: 5, question: "Which element has the atomic number 6?", options: ["Nitrogen", "Oxygen", "Carbon", "Boron"], correctOption: "Carbon", genres: ["Chemistry", "Periodic Table", "Basics"], tag: "Introduction" },
  { id: 6, question: "What is the unit of electrical resistance?", options: ["Volt", "Watt", "Ohm", "Ampere"], correctOption: "Ohm", genres: ["Physics", "Electricity", "Units"], tag: "Introduction" },
  { id: 7, question: "What is the quadratic formula used to find the roots of a quadratic equation?", options: ["(-b ± √(b² - 4ac)) / 2a", "(-b ± 2ac) / √(b² - 4ac)", "(-b ± √(4ac - b²)) / 2a", "(-2a ± √(b² - 4ac)) / b"], correctOption: "(-b ± √(b² - 4ac)) / 2a", genres: ["Mathematics", "Algebra", "Equations"], tag: "Introduction" },
  { id: 8, question: "Which physical quantity is measured in Pascals?", options: ["Energy", "Force", "Pressure", "Power"], correctOption: "Pressure", genres: ["Physics", "Mechanics", "Units"],tag: "Introduction"  },
  { id: 9, question: "What is the speed of light in a vacuum?", options: ["3 × 10^6 m/s", "3 × 10^5 m/s", "3 × 10^8 m/s", "3 × 10^4 m/s"], correctOption: "3 × 10^8 m/s", genres: ["Physics", "Electromagnetism", "Constants"], tag: "Introduction" },
  { id: 10, question: "Who is known as the father of modern chemistry?", options: ["Antoine Lavoisier", "Dmitri Mendeleev", "Marie Curie", "Robert Boyle"], correctOption: "Antoine Lavoisier", genres: ["Chemistry", "History", "Famous Scientists"], tag: "Introduction" },
  // Next 20 Questions
  { id: 11, question: "What is the SI unit of temperature?", options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"], correctOption: "Kelvin", genres: ["Physics", "Thermodynamics", "Units"] },
  { id: 12, question: "What is the main gas found in the Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"], correctOption: "Nitrogen", genres: ["Earth Science", "Atmosphere", "Gases"] },
  { id: 13, question: "Which acid is found in the human stomach?", options: ["Nitric Acid", "Sulfuric Acid", "Acetic Acid", "Hydrochloric Acid"], correctOption: "Hydrochloric Acid", genres: ["Biology", "Human Body", "Digestive System"] },
  { id: 14, question: "What is the derivative of x² with respect to x?", options: ["x", "1", "x^2", "2x"], correctOption: "2x", genres: ["Mathematics", "Calculus", "Differentiation"] },
  { id: 15, question: "Which scientist developed the general theory of relativity?", options: ["Galileo Galilei", "Isaac Newton", "Albert Einstein", "Niels Bohr"], correctOption: "Albert Einstein", genres: ["Physics", "Relativity", "Famous Scientists"] },
  { id: 16, question: "What is the chemical formula for water?", options: ["O2", "H2O", "CO2", "HO2"], correctOption: "H2O", genres: ["Chemistry", "Molecules", "Basics"] },
  { id: 17, question: "Which physical quantity is measured in Pascals?", options: ["Energy", "Force", "Pressure", "Power"], correctOption: "Pressure", genres: ["Physics", "Mechanics", "Units"] },
  { id: 18, question: "What is the atomic number of Oxygen?", options: ["6", "12", "8", "16"], correctOption: "8", genres: ["Chemistry", "Periodic Table", "Basics"] },
  { id: 19, question: "What is the product of the reaction between an acid and a base?", options: ["Water and Carbon Dioxide", "Salt and Water", "Water and Oxygen", "Salt and Hydrogen"], correctOption: "Salt and Water", genres: ["Chemistry", "Reactions", "Acid-Base"] },
  { id: 20, question: "Which law of thermodynamics states that energy cannot be created or destroyed?", options: ["Second Law of Thermodynamics", "Third Law of Thermodynamics", "Zeroth Law of Thermodynamics", "First Law of Thermodynamics"], correctOption: "First Law of Thermodynamics", genres: ["Physics", "Thermodynamics", "Laws"] },
  { id: 21, question: "What is the dimensional formula of Force?", options: ["MLT⁻²", "ML²T⁻²", "MLT⁻¹", "ML⁻¹T⁻²"], correctOption: "MLT⁻²", genres: ["Physics", "Mechanics", "Dimensions"] },
  { id: 22, question: "What is the logarithm of 1 to any base?", options: ["1", "0", "Undefined", "Infinity"], correctOption: "0", genres: ["Mathematics", "Logarithms", "Basics"] },
  { id: 23, question: "Which metal is the best conductor of electricity?", options: ["Copper", "Gold", "Aluminum", "Silver"], correctOption: "Silver", genres: ["Physics", "Electricity", "Materials"] },
  { id: 24, question: "What is the formula for kinetic energy?", options: ["mv", "½mv²", "mv²", "½mv"], correctOption: "½mv²", genres: ["Physics", "Mechanics", "Energy"] },
  { id: 25, question: "Which of the following is an exothermic process?", options: ["Melting of Ice", "Combustion", "Photosynthesis", "Evaporation"], correctOption: "Combustion", genres: ["Chemistry", "Reactions", "Thermochemistry"] },
  { id: 26, question: "What is the value of π (Pi) to two decimal places?", options: ["3.15", "3.13", "3.14", "3.12"], correctOption: "3.14", genres: ["Mathematics", "Constants", "Geometry"] },
  { id: 27, question: "Which gas is used in the preparation of ammonia in the Haber process?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], correctOption: "Nitrogen", genres: ["Chemistry", "Industrial Processes", "Gases"] },
  { id: 28, question: "What is the name of the force that opposes the motion of an object through a fluid?", options: ["Lift", "Thrust", "Drag", "Friction"], correctOption: "Drag", genres: ["Physics", "Mechanics", "Forces"] },
  { id: 29, question: "Which compound is known as the 'universal solvent'?", options: ["Benzene", "Water", "Acetone", "Ethanol"], correctOption: "Water", genres: ["Chemistry", "Molecules", "Solvents"] },
  { id: 30, question: "Which element has the highest electronegativity?", options: ["Oxygen", "Chlorine", "Nitrogen", "Fluorine"], correctOption: "Fluorine", genres: ["Chemistry", "Periodic Table", "Properties"] },
];


const QQNEET = [
  { id: 1, question: "What is the powerhouse of the cell?", options: ["Golgi Apparatus", "Nucleus", "Ribosome", "Mitochondria"], correctOption: "Mitochondria", genres: ["Biology", "Cell Biology", "Basics"], tag: "Introduction" },
  { id: 2, question: "What is the chemical formula of glucose?", options: ["C6H12O6", "C6H14O6", "C6H10O5", "C5H10O5"], correctOption: "C6H12O6", genres: ["Chemistry", "Biochemistry", "Molecules"], tag: "Introduction" },
  { id: 3, question: "Which vitamin is essential for the synthesis of collagen?", options: ["Vitamin E", "Vitamin A", "Vitamin C", "Vitamin D"], correctOption: "Vitamin C", genres: ["Biology", "Nutrition", "Vitamins"], tag: "Introduction" },
  { id: 4, question: "Which part of the plant is primarily involved in photosynthesis?", options: ["Flowers", "Stems", "Leaves", "Roots"], correctOption: "Leaves", genres: ["Biology", "Plant Biology", "Photosynthesis"], tag: "Introduction" },
  { id: 5, question: "What is the primary function of the large intestine?", options: ["Secretion of bile", "Production of insulin", "Absorption of water", "Digestion of proteins"], correctOption: "Absorption of water", genres: ["Biology", "Human Anatomy", "Digestive System"], tag: "Introduction" },
  { id: 6, question: "Which type of bond is formed by the sharing of electrons between atoms?", options: ["Metallic Bond", "Ionic Bond", "Hydrogen Bond", "Covalent Bond"], correctOption: "Covalent Bond", genres: ["Chemistry", "Bonding", "Basics"], tag: "Introduction" },
  { id: 7, question: "What is the process of converting glucose into energy in cells called?", options: ["Photosynthesis", "Electron Transport Chain", "Glycolysis", "Krebs Cycle"], correctOption: "Glycolysis", genres: ["Biology", "Cell Metabolism", "Energy"], tag: "Introduction" },
  { id: 8, question: "Which hormone regulates blood sugar levels?", options: ["Insulin", "Estrogen", "Thyroxine", "Adrenaline"], correctOption: "Insulin", genres: ["Biology", "Endocrinology", "Hormones"], tag: "Introduction" },
  { id: 9, question: "What is the name of the process by which plants lose water through small openings in their leaves?", options: ["Germination", "Photosynthesis", "Respiration", "Transpiration"], correctOption: "Transpiration", genres: ["Biology", "Plant Physiology", "Processes"], tag: "Introduction" },
  { id: 10, question: "Which organ is responsible for detoxifying harmful substances in the body?", options: ["Kidneys", "Heart", "Liver", "Lungs"], correctOption: "Liver", genres: ["Biology", "Human Anatomy", "Organ Functions"], tag: "Introduction" },
  { id: 11, question: "What is the primary role of the circulatory system?", options: ["Transport of nutrients and oxygen", "Protection from pathogens", "Production of hormones", "Digestion of food"], correctOption: "Transport of nutrients and oxygen", genres: ["Biology", "Circulatory System", "Human Anatomy"] },
  { id: 12, question: "Which enzyme breaks down proteins in the stomach?", options: ["Amylase", "Lipase", "Pepsin", "Trypsin"], correctOption: "Pepsin", genres: ["Biology", "Digestive System", "Enzymes"] },
  { id: 13, question: "What is the primary function of red blood cells?", options: ["Waste removal", "Oxygen transport", "Immune response", "Nutrient absorption"], correctOption: "Oxygen transport", genres: ["Biology", "Human Anatomy", "Blood"] },
  { id: 14, question: "Which part of the brain is responsible for controlling voluntary movements?", options: ["Hypothalamus", "Cerebellum", "Brainstem", "Cerebrum"], correctOption: "Cerebrum", genres: ["Biology", "Neuroanatomy", "Brain Functions"] },
  { id: 15, question: "What is the main function of the mitochondria?", options: ["Cell division", "Energy production", "Photosynthesis", "Protein synthesis"], correctOption: "Energy production", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 16, question: "Which process converts light energy into chemical energy in plants?", options: ["Respiration", "Fermentation", "Glycolysis", "Photosynthesis"], correctOption: "Photosynthesis", genres: ["Biology", "Plant Physiology", "Photosynthesis"] },
  { id: 17, question: "What is the name of the process by which plants convert sunlight into energy?", options: ["Germination", "Photosynthesis", "Transpiration", "Respiration"], correctOption: "Photosynthesis", genres: ["Biology", "Plant Biology", "Processes"] },
  { id: 18, question: "Which blood group is known as the universal donor?", options: ["O-", "A-", "AB+", "B+"], correctOption: "O-", genres: ["Biology", "Genetics", "Blood Groups"] },
  { id: 19, question: "What is the function of the ribosomes in a cell?", options: ["Genetic material storage", "Energy production", "Cell division", "Protein synthesis"], correctOption: "Protein synthesis", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 20, question: "Which organelle is known as the 'powerhouse of the cell'?", options: ["Mitochondria", "Golgi Apparatus", "Nucleus", "Ribosome"], correctOption: "Mitochondria", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 21, question: "What is the primary function of the immune system?", options: ["Defense against pathogens", "Regulation of hormones", "Transport of nutrients", "Digestion of food"], correctOption: "Defense against pathogens", genres: ["Biology", "Immunology", "Human Anatomy"] },
  { id: 22, question: "Which type of cell division is responsible for growth and repair in humans?", options: ["Binary Fission", "Budding", "Meiosis", "Mitosis"], correctOption: "Mitosis", genres: ["Biology", "Cell Biology", "Division"] },
  { id: 23, question: "What is the role of the large intestine in digestion?", options: ["Absorption of nutrients", "Secretion of digestive enzymes", "Digestion of proteins", "Absorption of water and electrolytes"], correctOption: "Absorption of water and electrolytes", genres: ["Biology", "Digestive System", "Human Anatomy"] },
  { id: 24, question: "Which organ in the human body is primarily responsible for producing bile?", options: ["Gallbladder", "Small Intestine", "Pancreas", "Liver"], correctOption: "Liver", genres: ["Biology", "Digestive System", "Organ Functions"] },
  { id: 25, question: "What is the name of the process by which water is lost from plants?", options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"], correctOption: "Transpiration", genres: ["Biology", "Plant Biology", "Processes"] },
  { id: 26, question: "Which type of RNA carries amino acids to the ribosome during protein synthesis?", options: ["mRNA", "sRNA", "rRNA", "tRNA"], correctOption: "tRNA", genres: ["Biology", "Genetics", "Protein Synthesis"] },
  { id: 27, question: "What is the name of the enzyme that breaks down starch into sugars?", options: ["Lipase", "Protease", "Amylase", "Pepsin"], correctOption: "Amylase", genres: ["Biology", "Digestive Enzymes", "Biochemistry"] },
  { id: 28, question: "Which of the following is a function of the kidney?", options: ["Production of insulin", "Filtration of blood", "Digestion of proteins", "Absorption of nutrients"], correctOption: "Filtration of blood", genres: ["Biology", "Human Anatomy", "Renal System"] },
  { id: 29, question: "What is the role of the endoplasmic reticulum in a cell?", options: ["DNA replication", "Protein and lipid synthesis", "Energy production", "Cell division"], correctOption: "Protein and lipid synthesis", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 30, question: "Which type of cell division produces gametes?", options: ["Budding", "Binary Fission", "Meiosis", "Mitosis"], correctOption: "Meiosis", genres: ["Biology", "Genetics", "Cell Division"] }
];



const QQGATE = [
  { id: 1, question: "What is the fundamental unit of a computer's memory?", options: ["Byte", "Nibble", "Bit", "Word"], correctOption: "Bit", genres: ["Computer Science", "Memory", "Basics"], tag: "Introduction" },
  { id: 2, question: "In which algorithm is a node expanded only when it is chosen as the best possible node to expand?", options: ["Dijkstra's Algorithm", "Breadth-First Search", "A* Algorithm", "Depth-First Search"], correctOption: "A* Algorithm", genres: ["Algorithms", "Search Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 3, question: "Which data structure uses LIFO (Last In, First Out) principle?", options: ["Queue", "Stack", "Linked List", "Tree"], correctOption: "Stack", genres: ["Data Structures", "Computer Science", "Basics"], tag: "Introduction" },
  { id: 4, question: "What is the worst-case time complexity of QuickSort algorithm?", options: ["O(n)", "O(log n)", "O(n^2)", "O(n log n)"], correctOption: "O(n^2)", genres: ["Algorithms", "Sorting Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 5, question: "Which of the following is a non-volatile memory?", options: ["Cache", "Register", "ROM", "RAM"], correctOption: "ROM", genres: ["Computer Science", "Memory", "Basics"], tag: "Introduction" },
  { id: 6, question: "What is the main purpose of normalization in databases?", options: ["Increase security", "Reduce redundancy", "Improve speed", "Facilitate indexing"], correctOption: "Reduce redundancy", genres: ["Databases", "Normalization", "Computer Science"], tag: "Introduction" },
  { id: 7, question: "In which layer of the OSI model does the IP protocol operate?", options: ["Network Layer", "Application Layer", "Transport Layer", "Data Link Layer"], correctOption: "Network Layer", genres: ["Networking", "OSI Model", "Computer Science"], tag: "Introduction" },
  { id: 8, question: "Which of the following is a heuristic search algorithm?", options: ["A* Algorithm", "Depth-First Search", "Dijkstra's Algorithm", "Breadth-First Search"], correctOption: "A* Algorithm", genres: ["Algorithms", "Search Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 9, question: "What does CPU stand for?", options: ["Central Program Unit", "Computer Processing Unit", "Computing Power Unit", "Central Processing Unit"], correctOption: "Central Processing Unit", genres: ["Computer Science", "Basics", "Hardware"], tag: "Introduction" },
  { id: 10, question: "What is the purpose of a compiler in programming?", options: ["Debug code", "Translate high-level code to machine code", "Execute code line by line", "Manage memory"], correctOption: "Translate high-level code to machine code", genres: ["Programming", "Compiler Design", "Computer Science"], tag: "Introduction" },
  // Next 20 Questions
  { id: 11, question: "What is the primary function of an Operating System?", options: ["Execute applications", "Control network operations", "Manage hardware resources", "Store data"], correctOption: "Manage hardware resources", genres: ["Operating Systems", "Computer Science", "Basics"] },
  { id: 12, question: "Which sorting algorithm is based on the divide and conquer approach?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correctOption: "Merge Sort", genres: ["Algorithms", "Sorting Algorithms", "Computer Science"] },
  { id: 13, question: "What is the time complexity of Binary Search algorithm?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], correctOption: "O(log n)", genres: ["Algorithms", "Search Algorithms", "Computer Science"] },
  { id: 14, question: "Which protocol is used to securely transmit data over a network?", options: ["SMTP", "HTTPS", "HTTP", "FTP"], correctOption: "HTTPS", genres: ["Networking", "Security", "Computer Science"] },
  { id: 15, question: "What is the primary purpose of an index in a database?", options: ["Speed up query performance", "Store data", "Maintain data integrity", "Manage transactions"], correctOption: "Speed up query performance", genres: ["Databases", "Indexing", "Computer Science"] },
  { id: 16, question: "Which of the following is an example of a NoSQL database?", options: ["SQLite", "MySQL", "MongoDB", "PostgreSQL"], correctOption: "MongoDB", genres: ["Databases", "NoSQL", "Computer Science"] },
  { id: 17, question: "What is the main advantage of using a linked list over an array?", options: ["Dynamic size", "Better cache performance", "Constant-time access", "Simple implementation"], correctOption: "Dynamic size", genres: ["Data Structures", "Linked Lists", "Computer Science"] },
  { id: 18, question: "Which algorithm is commonly used for finding the shortest path in a graph?", options: ["Prim's Algorithm", "Kruskal's Algorithm", "A* Algorithm", "Dijkstra's Algorithm"], correctOption: "Dijkstra's Algorithm", genres: ["Algorithms", "Graph Algorithms", "Computer Science"] },
  { id: 19, question: "What is the primary function of an interrupt in a computer system?", options: ["Control input/output operations", "Signal the CPU to stop current tasks", "Increase processing speed", "Manage memory"], correctOption: "Signal the CPU to stop current tasks", genres: ["Computer Architecture", "Interrupts", "Computer Science"] },
  { id: 20, question: "Which of the following is an example of a dynamic programming problem?", options: ["Binary Search", "Knapsack Problem", "Graph Traversal", "Sorting Problem"], correctOption: "Knapsack Problem", genres: ["Algorithms", "Dynamic Programming", "Computer Science"] },
  { id: 21, question: "Which technology is used for implementing virtual machines?", options: ["Router", "Load Balancer", "Hypervisor", "Firewall"], correctOption: "Hypervisor", genres: ["Virtualization", "Computer Science", "Basics"] },
  { id: 22, question: "What is the purpose of a cache in a computer system?", options: ["Backup data", "Encrypt data", "Speed up data access", "Store data permanently"], correctOption: "Speed up data access", genres: ["Computer Architecture", "Caching", "Computer Science"] },
  { id: 23, question: "Which data structure is used to implement a priority queue?", options: ["Stack", "Linked List", "Heap", "Queue"], correctOption: "Heap", genres: ["Data Structures", "Priority Queues", "Computer Science"] },
  { id: 24, question: "What does DNS stand for?", options: ["Dynamic Name Service", "Domain Name System", "Data Network Service", "Direct Node Switching"], correctOption: "Domain Name System", genres: ["Networking", "Protocols", "Computer Science"] },
  { id: 25, question: "Which of the following algorithms is used for data compression?", options: ["Huffman Coding", "Binary Search", "QuickSort", "Merge Sort"], correctOption: "Huffman Coding", genres: ["Algorithms", "Data Compression", "Computer Science"] },
  { id: 26, question: "What is the primary purpose of a network router?", options: ["Manage local files", "Execute applications", "Store data", "Forward data packets between networks"], correctOption: "Forward data packets between networks", genres: ["Networking", "Routers", "Computer Science"] },
  { id: 27, question: "Which of the following is an example of a non-relational database?", options: ["SQL Server", "MySQL", "Cassandra", "Oracle"], correctOption: "Cassandra", genres: ["Databases", "NoSQL", "Computer Science"] },
  { id: 28, question: "What is the role of the ALU in a CPU?", options: ["Control input/output", "Execute instructions", "Perform arithmetic and logic operations", "Manage memory"], correctOption: "Perform arithmetic and logic operations", genres: ["Computer Architecture", "CPU", "Computer Science"] },
  { id: 29, question: "Which algorithm is used for efficient searching in a sorted array?", options: ["Depth-First Search", "Hashing", "Binary Search", "Linear Search"], correctOption: "Binary Search", genres: ["Algorithms", "Search Algorithms", "Computer Science"] },
  { id: 30, question: "What is the primary function of an operating system's file system?", options: ["Maintain network connections", "Control hardware devices", "Execute applications", "Manage files and directories"], correctOption: "Manage files and directories", genres: ["Operating Systems", "File Systems", "Computer Science"] }
];

const Adaptive = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [wrongTopicGenres, setWrongTopicGenres] = useState({});
  const [marks, setMarks] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const location = useLocation();
  const { topic } = location.state || {};

  // Select the appropriate question set based on the topic
  const getQuestionSet = () => {
    switch (topic) {
      case 'JEE':
        return QQJEE;
      case 'NEET':
        return QQNEET;
      case 'GATE':
        return QQGATE;
      case 'GK':
        return quizQuestions;
      default:
        return [];
    }
  };

  useEffect(() => {
    
    const initializeQuiz = () => {
      const questions = getQuestionSet();
      const introQuestions = questions.filter(q => q.tag === 'Introduction');
      const randomIntroQuestions = introQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
      setSelectedQuestions(randomIntroQuestions);
    };

    initializeQuiz();
  }, [topic]);

  useEffect(() => {
    if (selectedQuestions.length >= 10 && currentQuestionIndex >= selectedQuestions.length) {
      setQuizFinished(true);
    }
  }, [selectedQuestions, currentQuestionIndex]);

  const handleAnswerSelect = (option) => {
    setUserAnswer(option);
  };

  const handleSubmit = () => {
    if (userAnswer === null) return;
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = userAnswer === currentQuestion.correctOption;
    
    if (isCorrect) {
      setMarks(marks + 1);
    } else {
      updateWrongTopicGenres(currentQuestion);
      if(currentQuestionIndex>=3)console.log(wrongTopicGenres)
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if(currentQuestionIndex<3)console.log(wrongTopicGenres)
    if (isSubmitted) {
      if (currentQuestionIndex + 1 < selectedQuestions.length) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setUserAnswer(null);
        setIsSubmitted(false);
      } else if (selectedQuestions.length < 10) {
        generateAdditionalQuestion();
      } else {
        setShowResults(true);
      }
    }
  };

  const generateAdditionalQuestion = () => {
    const questionsNeeded = 10 - selectedQuestions.length;

    if (questionsNeeded > 0) {
      if (Object.keys(wrongTopicGenres).length > 0) {
        generateQuestionBasedOnGenres();
      } else {
        generateRandomQuestion();
      }
    }
  };

  const generateQuestionBasedOnGenres = () => {
    const sortedGenres = Object.entries(wrongTopicGenres)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const questions = getQuestionSet();
    const remainingQuestions = questions.filter(q => !q.tag || !q.tag.includes('Introduction'));
    const filteredQuestions = remainingQuestions.filter(q => sortedGenres.some(genre => q.genres.includes(genre)))
      .filter(q => !selectedQuestions.some(selected => selected.id === q.id));

    if (filteredQuestions.length === 0) {
      generateRandomQuestion();
      return;
    }

    const nextQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    setSelectedQuestions(prev => [...prev, nextQuestion]);
  };

  const generateRandomQuestion = () => {
    const questions = getQuestionSet();
    const remainingQuestions = questions.filter(q => !q.tag || !q.tag.includes('Introduction'));
    const randomQuestions = remainingQuestions.filter(q => !selectedQuestions.some(selected => selected.id === q.id));
    
    if (randomQuestions.length > 0) {
      const nextQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
      setSelectedQuestions(prev => [...prev, nextQuestion]);
    }
  };

  const updateWrongTopicGenres = (question) => {
    const updatedGenres = { ...wrongTopicGenres };
    question.genres.forEach(genre => {
      updatedGenres[genre] = (updatedGenres[genre] || 0) + 1;
    });
    setWrongTopicGenres(updatedGenres);
  };
  const getOptionStyle = (option) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    if (isSubmitted) {
      if (option === currentQuestion.correctOption) {
        return { backgroundColor: '#28a745', color: '#fff' }; // Correct answer
      } else if (option === userAnswer) {
        return { backgroundColor: '#dc3545', color: '#fff' }; // Wrong answer
      }
    } else if (option === userAnswer) {
      return { backgroundColor: '#360bab', color: '#fff' }; // Selected answer
    }

    return { backgroundColor: '#f0f1f0', color: '#000' }; // Default color
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  if (showResults) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '60px auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Navigationbar />
      </div>
        <h1 style={{
          fontSize: '3rem',
          color: '#2c3e50',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>Quiz Analytics</h1>
    
        <p style={{
          fontSize: '2rem',
          color: '#27ae60',
          fontWeight: '600',
          marginBottom: '40px'
        }}>Total Marks: {marks}</p>
    
        <h2 style={{
          fontSize: '2.2rem',
          color: '#e74c3c',
          marginBottom: '20px',
          fontWeight: '500'
        }}>Wrong Topic Genres</h2>
    
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '40px',
          fontSize: '1.2rem',
          color: '#34495e'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#ecf0f1',
              borderBottom: '2px solid #bdc3c7'
            }}>
              <th style={{
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: '600'
              }}>Genre</th>
              <th style={{
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: '600'
              }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(wrongTopicGenres).map(([genre, count]) => (
              <tr key={genre} style={{
                borderBottom: '1px solid #bdc3c7'
              }}>
                <td style={{
                  padding: '12px 15px',
                  textAlign: 'left'
                }}>{genre}</td>
                <td style={{
                  padding: '12px 15px',
                  textAlign: 'left'
                }}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
        <p style={{
          fontSize: '1rem',
          color: '#7f8c8d',
          marginTop: '20px'
        }}>This analysis helps you understand which topics need more focus in future quizzes.</p>
      </div>
    );
    
  }

  return (
    <div className='total' >
    {/* <div>{JSON.stringify(getQuestionSet(), null, 2)}</div> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Navigationbar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         Question Topics : 
        {currentQuestion && currentQuestion.genres.map(genre=>(
          <div style={{marginLeft:5}}><h4>{genre}</h4></div>
        ))}
      </div>
      <h1 style={{ fontSize: '2.5rem',color: 'white'}}>Quiz</h1>
      {currentQuestion ? (
        <div className='BigDiv' style={{  backgroundColor: backgroundColor}}>
          <div className='BigDiv01'>
            <div className='BigDiv0101'>{currentQuestion.question}</div>
          </div>
          <div className='BigDiv02'>
            {currentQuestion.options.map(option => (
              <div
                className='BigDiv0201'
                key={option}
                onClick={() => handleAnswerSelect(option)}
                style={getOptionStyle(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button
            onClick={isSubmitted ? handleNext : handleSubmit}
            disabled={userAnswer === null && !isSubmitted}
            style={{ marginTop: '10px' }}
            className='button-next'
          >
            {isSubmitted ? 'Next' : 'Submit'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Adaptive;