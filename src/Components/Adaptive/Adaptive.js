import React, { useState, useEffect } from 'react';
import Navigationbar from '../smallcomponents/Navbar';
import { useLocation } from 'react-router-dom';

const quizQuestions = [
  // First 10 Questions (Introduction)
  {
    id: 1,
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    correctOption: "Tokyo",
    genres: ["Geography", "Asia", "Capitals"],
    tag: "Introduction"
  },
  {
    id: 2,
    question: "Which element has the atomic number 1?",
    options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
    correctOption: "Hydrogen",
    genres: ["Chemistry", "Periodic Table", "Basics"],
    tag: "Introduction"
  },
  {
    id: 3,
    question: "In which year did World War II end?",
    options: ["1945", "1940", "1939", "1950"],
    correctOption: "1945",
    genres: ["History", "World War II", "20th Century"],
    tag: "Introduction"
  },
  {
    id: 4,
    question: "What is the chemical formula for carbon dioxide?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctOption: "CO2",
    genres: ["Chemistry", "Molecules", "Formulas"],
    tag: "Introduction"
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctOption: "Mars",
    genres: ["Astronomy", "Solar System", "Planets"],
    tag: "Introduction"
  },
  {
    id: 6,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
    correctOption: "Harper Lee",
    genres: ["Literature", "Novels", "American Authors"],
    tag: "Introduction"
  },
  {
    id: 7,
    question: "What is the powerhouse of the cell?",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
    correctOption: "Mitochondria",
    genres: ["Biology", "Cell Structure", "Basics"],
    tag: "Introduction"
  },
  {
    id: 8,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["Brazil", "China", "Japan", "Germany"],
    correctOption: "Brazil",
    genres: ["Sports", "Olympics", "World Events"],
    tag: "Introduction"
  },
  {
    id: 9,
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "100°C", "-32°C", "32°F"],
    correctOption: "0°C",
    genres: ["Physics", "Temperature", "Basics"],
    tag: "Introduction"
  },
  {
    id: 10,
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    correctOption: "Leonardo da Vinci",
    genres: ["Art", "Renaissance", "Masterpieces"],
    tag: "Introduction"
  },
  // Next 20 Questions
  {
    id: 11,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correctOption: "Au",
    genres: ["Chemistry", "Elements", "Precious Metals"],
  },
  {
    id: 12,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["Japan", "China", "Thailand", "South Korea"],
    correctOption: "Japan",
    genres: ["Geography", "Asia", "Countries"],
  },
  {
    id: 13,
    question: "What is the square root of 144?",
    options: ["12", "14", "16", "18"],
    correctOption: "12",
    genres: ["Mathematics", "Algebra", "Basics"],
  },
  {
    id: 14,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctOption: "Jupiter",
    genres: ["Astronomy", "Solar System", "Planets"],
  },
  {
    id: 15,
    question: "Who developed the theory of relativity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctOption: "Albert Einstein",
    genres: ["Physics", "Relativity", "Famous Scientists"],
  },
  {
    id: 16,
    question: "What is the largest mammal in the world?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Rhino"],
    correctOption: "Blue Whale",
    genres: ["Biology", "Animals", "Marine Life"],
  },
  {
    id: 17,
    question: "What is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctOption: "Nile",
    genres: ["Geography", "Rivers", "World"],
  },
  {
    id: 18,
    question: "Who was the first person to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    correctOption: "Neil Armstrong",
    genres: ["Space Exploration", "Astronauts", "1960s"],
  },
  {
    id: 19,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
    correctOption: "Nitrogen",
    genres: ["Earth Science", "Atmosphere", "Gases"],
  },
  {
    id: 20,
    question: "Which Shakespeare play features the characters Romeo and Juliet?",
    options: ["Romeo and Juliet", "Macbeth", "Hamlet", "Othello"],
    correctOption: "Romeo and Juliet",
    genres: ["Literature", "Plays", "Shakespeare"],
  },
  {
    id: 21,
    question: "Which organ is responsible for pumping blood throughout the body?",
    options: ["Heart", "Lungs", "Kidneys", "Liver"],
    correctOption: "Heart",
    genres: ["Biology", "Human Body", "Circulatory System"],
  },
  {
    id: 22,
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arctic", "Gobi", "Kalahari"],
    correctOption: "Sahara",
    genres: ["Geography", "Deserts", "Africa"],
  },
  {
    id: 23,
    question: "Which composer is known for his 'Fifth Symphony'?",
    options: ["Beethoven", "Mozart", "Bach", "Chopin"],
    correctOption: "Beethoven",
    genres: ["Music", "Classical", "Composers"],
  },
  {
    id: 24,
    question: "What is the primary language spoken in Brazil?",
    options: ["Portuguese", "Spanish", "English", "French"],
    correctOption: "Portuguese",
    genres: ["Languages", "South America", "Culture"],
  },
  {
    id: 25,
    question: "What is the capital of Australia?",
    options: ["Canberra", "Sydney", "Melbourne", "Perth"],
    correctOption: "Canberra",
    genres: ["Geography", "Oceania", "Capitals"],
  },
  {
    id: 26,
    question: "What is the boiling point of water at sea level in Celsius?",
    options: ["100°C", "0°C", "50°C", "75°C"],
    correctOption: "100°C",
    genres: ["Physics", "Temperature", "Basics"],
  },
  {
    id: 27,
    question: "Who was the first president of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctOption: "George Washington",
    genres: ["History", "United States", "Presidents"],
  },
  {
    id: 28,
    question: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Won"],
    correctOption: "Yen",
    genres: ["Economics", "Asia", "Currencies"],
  },
  {
    id: 29,
    question: "Which artist painted the ceiling of the Sistine Chapel?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctOption: "Michelangelo",
    genres: ["Art", "Renaissance", "Masterpieces"],
  },
  {
    id: 30,
    question: "What is the most populous country in the world?",
    options: ["China", "India", "United States", "Indonesia"],
    correctOption: "China",
    genres: ["Geography", "Population", "Countries"],
  },
];
// Define your quiz question sets
const QQJEE = [
  { id: 1, question: "What is the chemical symbol for Sodium?", options: ["Na", "S", "Sn", "Si"], correctOption: "Na", genres: ["Chemistry", "Elements", "Basics"], tag: "Introduction" },
  { id: 2, question: "What is the derivative of sin(x) with respect to x?", options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"], correctOption: "cos(x)", genres: ["Mathematics", "Calculus", "Trigonometry"], tag: "Introduction" },
  { id: 3, question: "Which law states that the pressure of a gas is inversely proportional to its volume at constant temperature?", options: ["Boyle's Law", "Charles's Law", "Avogadro's Law", "Gay-Lussac's Law"], correctOption: "Boyle's Law", genres: ["Physics", "Thermodynamics", "Gas Laws"], tag: "Introduction" },
  { id: 4, question: "What is the integral of 2x with respect to x?", options: ["x^2 + C", "2x^2 + C", "x^2", "2x"], correctOption: "x^2 + C", genres: ["Mathematics", "Calculus", "Integration"], tag: "Introduction" },
  { id: 5, question: "Which element has the atomic number 6?", options: ["Carbon", "Oxygen", "Nitrogen", "Boron"], correctOption: "Carbon", genres: ["Chemistry", "Periodic Table", "Basics"], tag: "Introduction" },
  { id: 6, question: "What is the unit of electrical resistance?", options: ["Ohm", "Volt", "Ampere", "Watt"], correctOption: "Ohm", genres: ["Physics", "Electricity", "Units"], tag: "Introduction" },
  { id: 7, question: "What is the quadratic formula used to find the roots of a quadratic equation?", options: ["(-b ± √(b² - 4ac)) / 2a", "(-b ± 2ac) / √(b² - 4ac)", "(-b ± √(4ac - b²)) / 2a", "(-2a ± √(b² - 4ac)) / b"], correctOption: "(-b ± √(b² - 4ac)) / 2a", genres: ["Mathematics", "Algebra", "Equations"], tag: "Introduction" },
  { id: 8, question: "Which planet is known as the Blue Planet?", options: ["Earth", "Neptune", "Uranus", "Mars"], correctOption: "Earth", genres: ["Astronomy", "Solar System", "Planets"], tag: "Introduction" },
  { id: 9, question: "What is the speed of light in a vacuum?", options: ["3 × 10^8 m/s", "3 × 10^6 m/s", "3 × 10^5 m/s", "3 × 10^4 m/s"], correctOption: "3 × 10^8 m/s", genres: ["Physics", "Electromagnetism", "Constants"], tag: "Introduction" },
  { id: 10, question: "Who is known as the father of modern chemistry?", options: ["Antoine Lavoisier", "Dmitri Mendeleev", "Robert Boyle", "Marie Curie"], correctOption: "Antoine Lavoisier", genres: ["Chemistry", "History", "Famous Scientists"], tag: "Introduction" },
  // Next 20 Questions
  { id: 11, question: "What is the SI unit of temperature?", options: ["Kelvin", "Celsius", "Fahrenheit", "Rankine"], correctOption: "Kelvin", genres: ["Physics", "Thermodynamics", "Units"] },
  { id: 12, question: "What is the main gas found in the Earth's atmosphere?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], correctOption: "Nitrogen", genres: ["Earth Science", "Atmosphere", "Gases"] },
  { id: 13, question: "Which acid is found in the human stomach?", options: ["Hydrochloric Acid", "Sulfuric Acid", "Acetic Acid", "Nitric Acid"], correctOption: "Hydrochloric Acid", genres: ["Biology", "Human Body", "Digestive System"] },
  { id: 14, question: "What is the derivative of x² with respect to x?", options: ["2x", "x", "x^2", "1"], correctOption: "2x", genres: ["Mathematics", "Calculus", "Differentiation"] },
  { id: 15, question: "Which scientist developed the general theory of relativity?", options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Niels Bohr"], correctOption: "Albert Einstein", genres: ["Physics", "Relativity", "Famous Scientists"] },
  { id: 16, question: "What is the chemical formula for water?", options: ["H2O", "O2", "CO2", "HO2"], correctOption: "H2O", genres: ["Chemistry", "Molecules", "Basics"] },
  { id: 17, question: "Which physical quantity is measured in Pascals?", options: ["Pressure", "Force", "Energy", "Power"], correctOption: "Pressure", genres: ["Physics", "Mechanics", "Units"] },
  { id: 18, question: "What is the atomic number of Oxygen?", options: ["8", "16", "6", "12"], correctOption: "8", genres: ["Chemistry", "Periodic Table", "Basics"] },
  { id: 19, question: "What is the product of the reaction between an acid and a base?", options: ["Salt and Water", "Water and Carbon Dioxide", "Salt and Hydrogen", "Water and Oxygen"], correctOption: "Salt and Water", genres: ["Chemistry", "Reactions", "Acid-Base"] },
  { id: 20, question: "Which law of thermodynamics states that energy cannot be created or destroyed?", options: ["First Law of Thermodynamics", "Second Law of Thermodynamics", "Third Law of Thermodynamics", "Zeroth Law of Thermodynamics"], correctOption: "First Law of Thermodynamics", genres: ["Physics", "Thermodynamics", "Laws"] },
  { id: 21, question: "What is the dimensional formula of Force?", options: ["MLT⁻²", "MLT⁻¹", "ML²T⁻²", "ML⁻¹T⁻²"], correctOption: "MLT⁻²", genres: ["Physics", "Mechanics", "Dimensions"] },
  { id: 22, question: "What is the logarithm of 1 to any base?", options: ["0", "1", "Undefined", "Infinity"], correctOption: "0", genres: ["Mathematics", "Logarithms", "Basics"] },
  { id: 23, question: "Which metal is the best conductor of electricity?", options: ["Silver", "Copper", "Gold", "Aluminum"], correctOption: "Silver", genres: ["Physics", "Electricity", "Materials"] },
  { id: 24, question: "What is the formula for kinetic energy?", options: ["½mv²", "mv", "mv²", "½mv"], correctOption: "½mv²", genres: ["Physics", "Mechanics", "Energy"] },
  { id: 25, question: "Which of the following is an exothermic process?", options: ["Combustion", "Photosynthesis", "Melting of Ice", "Evaporation"], correctOption: "Combustion", genres: ["Chemistry", "Reactions", "Thermochemistry"] },
  { id: 26, question: "What is the value of π (Pi) to two decimal places?", options: ["3.14", "3.15", "3.13", "3.12"], correctOption: "3.14", genres: ["Mathematics", "Constants", "Geometry"] },
  { id: 27, question: "Which gas is used in the preparation of ammonia in the Haber process?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"], correctOption: "Nitrogen", genres: ["Chemistry", "Industrial Processes", "Gases"] },
  { id: 28, question: "What is the name of the force that opposes the motion of an object through a fluid?", options: ["Drag", "Thrust", "Lift", "Friction"], correctOption: "Drag", genres: ["Physics", "Mechanics", "Forces"] },
  { id: 29, question: "Which compound is known as the 'universal solvent'?", options: ["Water", "Ethanol", "Acetone", "Benzene"], correctOption: "Water", genres: ["Chemistry", "Molecules", "Solvents"] },
  { id: 30, question: "Which element has the highest electronegativity?", options: ["Fluorine", "Oxygen", "Chlorine", "Nitrogen"], correctOption: "Fluorine", genres: ["Chemistry", "Periodic Table", "Properties"] },
];

const QQNEET = [
  { id: 1, question: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"], correctOption: "Mitochondria", genres: ["Biology", "Cell Biology", "Basics"], tag: "Introduction" },
  { id: 2, question: "What is the chemical formula of glucose?", options: ["C6H12O6", "C5H10O5", "C6H10O5", "C6H14O6"], correctOption: "C6H12O6", genres: ["Chemistry", "Biochemistry", "Molecules"], tag: "Introduction" },
  { id: 3, question: "Which vitamin is essential for the synthesis of collagen?", options: ["Vitamin C", "Vitamin A", "Vitamin D", "Vitamin E"], correctOption: "Vitamin C", genres: ["Biology", "Nutrition", "Vitamins"], tag: "Introduction" },
  { id: 4, question: "Which part of the plant is primarily involved in photosynthesis?", options: ["Leaves", "Roots", "Stems", "Flowers"], correctOption: "Leaves", genres: ["Biology", "Plant Biology", "Photosynthesis"], tag: "Introduction" },
  { id: 5, question: "What is the primary function of the large intestine?", options: ["Absorption of water", "Digestion of proteins", "Production of insulin", "Secretion of bile"], correctOption: "Absorption of water", genres: ["Biology", "Human Anatomy", "Digestive System"], tag: "Introduction" },
  { id: 6, question: "Which type of bond is formed by the sharing of electrons between atoms?", options: ["Covalent Bond", "Ionic Bond", "Hydrogen Bond", "Metallic Bond"], correctOption: "Covalent Bond", genres: ["Chemistry", "Bonding", "Basics"], tag: "Introduction" },
  { id: 7, question: "What is the process of converting glucose into energy in cells called?", options: ["Glycolysis", "Krebs Cycle", "Electron Transport Chain", "Photosynthesis"], correctOption: "Glycolysis", genres: ["Biology", "Cell Metabolism", "Energy"], tag: "Introduction" },
  { id: 8, question: "Which hormone regulates blood sugar levels?", options: ["Insulin", "Adrenaline", "Thyroxine", "Estrogen"], correctOption: "Insulin", genres: ["Biology", "Endocrinology", "Hormones"], tag: "Introduction" },
  { id: 9, question: "What is the name of the process by which plants lose water through small openings in their leaves?", options: ["Transpiration", "Respiration", "Photosynthesis", "Germination"], correctOption: "Transpiration", genres: ["Biology", "Plant Physiology", "Processes"], tag: "Introduction" },
  { id: 10, question: "Which organ is responsible for detoxifying harmful substances in the body?", options: ["Liver", "Kidneys", "Lungs", "Heart"], correctOption: "Liver", genres: ["Biology", "Human Anatomy", "Organ Functions"], tag: "Introduction" },
  // Next 20 Questions
  { id: 11, question: "What is the primary role of the circulatory system?", options: ["Transport of nutrients and oxygen", "Production of hormones", "Digestion of food", "Protection from pathogens"], correctOption: "Transport of nutrients and oxygen", genres: ["Biology", "Circulatory System", "Human Anatomy"] },
  { id: 12, question: "Which enzyme breaks down proteins in the stomach?", options: ["Pepsin", "Amylase", "Lipase", "Trypsin"], correctOption: "Pepsin", genres: ["Biology", "Digestive System", "Enzymes"] },
  { id: 13, question: "What is the primary function of red blood cells?", options: ["Oxygen transport", "Immune response", "Nutrient absorption", "Waste removal"], correctOption: "Oxygen transport", genres: ["Biology", "Human Anatomy", "Blood"] },
  { id: 14, question: "Which part of the brain is responsible for controlling voluntary movements?", options: ["Cerebrum", "Cerebellum", "Brainstem", "Hypothalamus"], correctOption: "Cerebrum", genres: ["Biology", "Neuroanatomy", "Brain Functions"] },
  { id: 15, question: "What is the main function of the mitochondria?", options: ["Energy production", "Protein synthesis", "Cell division", "Photosynthesis"], correctOption: "Energy production", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 16, question: "Which process converts light energy into chemical energy in plants?", options: ["Photosynthesis", "Respiration", "Fermentation", "Glycolysis"], correctOption: "Photosynthesis", genres: ["Biology", "Plant Physiology", "Photosynthesis"] },
  { id: 17, question: "What is the name of the process by which plants convert sunlight into energy?", options: ["Photosynthesis", "Respiration", "Transpiration", "Germination"], correctOption: "Photosynthesis", genres: ["Biology", "Plant Biology", "Processes"] },
  { id: 18, question: "Which blood group is known as the universal donor?", options: ["O-", "AB+", "A-", "B+"], correctOption: "O-", genres: ["Biology", "Genetics", "Blood Groups"] },
  { id: 19, question: "What is the function of the ribosomes in a cell?", options: ["Protein synthesis", "Energy production", "Genetic material storage", "Cell division"], correctOption: "Protein synthesis", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 20, question: "Which organelle is known as the 'powerhouse of the cell'?", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"], correctOption: "Mitochondria", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 21, question: "What is the primary function of the immune system?", options: ["Defense against pathogens", "Digestion of food", "Transport of nutrients", "Regulation of hormones"], correctOption: "Defense against pathogens", genres: ["Biology", "Immunology", "Human Anatomy"] },
  { id: 22, question: "Which type of cell division is responsible for growth and repair in humans?", options: ["Mitosis", "Meiosis", "Binary Fission", "Budding"], correctOption: "Mitosis", genres: ["Biology", "Cell Biology", "Division"] },
  { id: 23, question: "What is the role of the large intestine in digestion?", options: ["Absorption of water and electrolytes", "Digestion of proteins", "Secretion of digestive enzymes", "Absorption of nutrients"], correctOption: "Absorption of water and electrolytes", genres: ["Biology", "Digestive System", "Human Anatomy"] },
  { id: 24, question: "Which organ in the human body is primarily responsible for producing bile?", options: ["Liver", "Gallbladder", "Pancreas", "Small Intestine"], correctOption: "Liver", genres: ["Biology", "Digestive System", "Organ Functions"] },
  { id: 25, question: "What is the name of the process by which water is lost from plants?", options: ["Transpiration", "Respiration", "Photosynthesis", "Germination"], correctOption: "Transpiration", genres: ["Biology", "Plant Biology", "Processes"] },
  { id: 26, question: "Which type of RNA carries amino acids to the ribosome during protein synthesis?", options: ["tRNA", "mRNA", "rRNA", "sRNA"], correctOption: "tRNA", genres: ["Biology", "Genetics", "Protein Synthesis"] },
  { id: 27, question: "What is the name of the enzyme that breaks down starch into sugars?", options: ["Amylase", "Lipase", "Protease", "Pepsin"], correctOption: "Amylase", genres: ["Biology", "Digestive Enzymes", "Biochemistry"] },
  { id: 28, question: "Which of the following is a function of the kidney?", options: ["Filtration of blood", "Production of insulin", "Digestion of proteins", "Absorption of nutrients"], correctOption: "Filtration of blood", genres: ["Biology", "Human Anatomy", "Renal System"] },
  { id: 29, question: "What is the role of the endoplasmic reticulum in a cell?", options: ["Protein and lipid synthesis", "Energy production", "DNA replication", "Cell division"], correctOption: "Protein and lipid synthesis", genres: ["Biology", "Cell Biology", "Organelles"] },
  { id: 30, question: "Which type of cell division produces gametes?", options: ["Meiosis", "Mitosis", "Binary Fission", "Budding"], correctOption: "Meiosis", genres: ["Biology", "Genetics", "Cell Division"] },
];

const QQGATE = [
  { id: 1, question: "What is the fundamental unit of a computer's memory?", options: ["Byte", "Bit", "Word", "Nibble"], correctOption: "Bit", genres: ["Computer Science", "Memory", "Basics"], tag: "Introduction" },
  { id: 2, question: "In which algorithm is a node expanded only when it is chosen as the best possible node to expand?", options: ["A* Algorithm", "Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm"], correctOption: "A* Algorithm", genres: ["Algorithms", "Search Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 3, question: "Which data structure uses LIFO (Last In, First Out) principle?", options: ["Stack", "Queue", "Linked List", "Tree"], correctOption: "Stack", genres: ["Data Structures", "Computer Science", "Basics"], tag: "Introduction" },
  { id: 4, question: "What is the worst-case time complexity of QuickSort algorithm?", options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"], correctOption: "O(n^2)", genres: ["Algorithms", "Sorting Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 5, question: "Which of the following is a non-volatile memory?", options: ["RAM", "Cache", "ROM", "Register"], correctOption: "ROM", genres: ["Computer Science", "Memory", "Basics"], tag: "Introduction" },
  { id: 6, question: "What is the main purpose of normalization in databases?", options: ["Reduce redundancy", "Improve speed", "Increase security", "Facilitate indexing"], correctOption: "Reduce redundancy", genres: ["Databases", "Normalization", "Computer Science"], tag: "Introduction" },
  { id: 7, question: "In which layer of the OSI model does the IP protocol operate?", options: ["Network Layer", "Transport Layer", "Data Link Layer", "Application Layer"], correctOption: "Network Layer", genres: ["Networking", "OSI Model", "Computer Science"], tag: "Introduction" },
  { id: 8, question: "Which of the following is a heuristic search algorithm?", options: ["A* Algorithm", "Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm"], correctOption: "A* Algorithm", genres: ["Algorithms", "Search Algorithms", "Computer Science"], tag: "Introduction" },
  { id: 9, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computing Power Unit"], correctOption: "Central Processing Unit", genres: ["Computer Science", "Basics", "Hardware"], tag: "Introduction" },
  { id: 10, question: "What is the purpose of a compiler in programming?", options: ["Translate high-level code to machine code", "Execute code line by line", "Debug code", "Manage memory"], correctOption: "Translate high-level code to machine code", genres: ["Programming", "Compiler Design", "Computer Science"], tag: "Introduction" },
  // Next 20 Questions
  { id: 11, question: "What is the primary function of an Operating System?", options: ["Manage hardware resources", "Execute applications", "Store data", "Control network operations"], correctOption: "Manage hardware resources", genres: ["Operating Systems", "Computer Science", "Basics"] },
  { id: 12, question: "Which sorting algorithm is based on the divide and conquer approach?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"], correctOption: "Merge Sort", genres: ["Algorithms", "Sorting Algorithms", "Computer Science"] },
  { id: 13, question: "What is the time complexity of Binary Search algorithm?", options: ["O(log n)", "O(n)", "O(n log n)", "O(n^2)"], correctOption: "O(log n)", genres: ["Algorithms", "Search Algorithms", "Computer Science"] },
  { id: 14, question: "Which protocol is used to securely transmit data over a network?", options: ["HTTPS", "HTTP", "FTP", "SMTP"], correctOption: "HTTPS", genres: ["Networking", "Security", "Computer Science"] },
  { id: 15, question: "What is the primary purpose of an index in a database?", options: ["Speed up query performance", "Store data", "Maintain data integrity", "Manage transactions"], correctOption: "Speed up query performance", genres: ["Databases", "Indexing", "Computer Science"] },
  { id: 16, question: "Which of the following is an example of a NoSQL database?", options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"], correctOption: "MongoDB", genres: ["Databases", "NoSQL", "Computer Science"] },
  { id: 17, question: "What is the main advantage of using a linked list over an array?", options: ["Dynamic size", "Constant-time access", "Better cache performance", "Simple implementation"], correctOption: "Dynamic size", genres: ["Data Structures", "Linked Lists", "Computer Science"] },
  { id: 18, question: "Which algorithm is commonly used for finding the shortest path in a graph?", options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "A* Algorithm"], correctOption: "Dijkstra's Algorithm", genres: ["Algorithms", "Graph Algorithms", "Computer Science"] },
  { id: 19, question: "What is the primary function of an interrupt in a computer system?", options: ["Signal the CPU to stop current tasks", "Increase processing speed", "Manage memory", "Control input/output operations"], correctOption: "Signal the CPU to stop current tasks", genres: ["Computer Architecture", "Interrupts", "Computer Science"] },
  { id: 20, question: "Which of the following is an example of a dynamic programming problem?", options: ["Knapsack Problem", "Sorting Problem", "Graph Traversal", "Binary Search"], correctOption: "Knapsack Problem", genres: ["Algorithms", "Dynamic Programming", "Computer Science"] },
  { id: 21, question: "Which technology is used for implementing virtual machines?", options: ["Hypervisor", "Firewall", "Load Balancer", "Router"], correctOption: "Hypervisor", genres: ["Virtualization", "Computer Science", "Basics"] },
  { id: 22, question: "What is the purpose of a cache in a computer system?", options: ["Speed up data access", "Store data permanently", "Backup data", "Encrypt data"], correctOption: "Speed up data access", genres: ["Computer Architecture", "Caching", "Computer Science"] },
  { id: 23, question: "Which data structure is used to implement a priority queue?", options: ["Heap", "Stack", "Queue", "Linked List"], correctOption: "Heap", genres: ["Data Structures", "Priority Queues", "Computer Science"] },
  { id: 24, question: "What does DNS stand for?", options: ["Domain Name System", "Data Network Service", "Direct Node Switching", "Dynamic Name Service"], correctOption: "Domain Name System", genres: ["Networking", "Protocols", "Computer Science"] },
  { id: 25, question: "Which of the following algorithms is used for data compression?", options: ["Huffman Coding", "Merge Sort", "QuickSort", "Binary Search"], correctOption: "Huffman Coding", genres: ["Algorithms", "Data Compression", "Computer Science"] },
  { id: 26, question: "What is the primary purpose of a network router?", options: ["Forward data packets between networks", "Store data", "Manage local files", "Execute applications"], correctOption: "Forward data packets between networks", genres: ["Networking", "Routers", "Computer Science"] },
  { id: 27, question: "Which of the following is an example of a non-relational database?", options: ["Cassandra", "Oracle", "SQL Server", "MySQL"], correctOption: "Cassandra", genres: ["Databases", "NoSQL", "Computer Science"] },
  { id: 28, question: "What is the role of the ALU in a CPU?", options: ["Perform arithmetic and logic operations", "Manage memory", "Control input/output", "Execute instructions"], correctOption: "Perform arithmetic and logic operations", genres: ["Computer Architecture", "CPU", "Computer Science"] },
  { id: 29, question: "Which algorithm is used for efficient searching in a sorted array?", options: ["Binary Search", "Linear Search", "Hashing", "Depth-First Search"], correctOption: "Binary Search", genres: ["Algorithms", "Search Algorithms", "Computer Science"] },
  { id: 30, question: "What is the primary function of an operating system's file system?", options: ["Manage files and directories", "Control hardware devices", "Execute applications", "Maintain network connections"], correctOption: "Manage files and directories", genres: ["Operating Systems", "File Systems", "Computer Science"] }
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
    console.log(topic);
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
    }

    setIsSubmitted(true);
  };

  const handleNext = () => {
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