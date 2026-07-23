import { SampleProgram } from "../types/ide";

export const SAMPLE_PROGRAMS: SampleProgram[] = [
  {
    id: "sample-main",
    name: "Sample Program (Variables, If-Else, While)",
    description: "The primary sample program featuring variables, conditionals, and while loop",
    category: "Basics",
    code: `# Variables
rakh naam = "Ishan"
rakh age = 21

dikha "Ram Ram!"
dikha naam

agar age >= 18
    dikha "Adult"
nahin
    dikha "Minor"
khatam

rakh i = 1

jabtak i <= 3
    dikha i
    i = i + 1
khatam`,
  },
  {
    id: "hello-world",
    name: "Hello World & Variables",
    description: "Basic greeting and variable declaration in BhojpuriLang",
    category: "Basics",
    code: `# Hello World in BhojpuriLang

rakh sandesh = "Ram Ram Bhojpuri Sansaar!"
dikha sandesh

rakh ginti = 108
dikha "Pavitra ginti:"
dikha ginti`,
  },
  {
    id: "if-else",
    name: "If-Else Condition (Bada vs Chhota)",
    description: "Conditional logic using 'agar', 'nahin', and 'khatam'",
    category: "Control Flow",
    code: `# Compare two numbers

rakh a = 45
rakh b = 30

dikha "Comparing numbers:"
dikha a
dikha b

agar a > b
    dikha "a bada ba b se"
nahin
    dikha "b bada ya barabar ba a se"
khatam`,
  },
  {
    id: "multiplication-table",
    name: "Multiplication Table (Pahaada 5 ka)",
    description: "Generates the multiplication table for 5 using 'jabtak'",
    category: "Loops",
    code: `# 5 ka Pahaada (Table of 5)

rakh num = 5
rakh i = 1

dikha "5 ka Pahaada:"

jabtak i <= 10
    rakh ans = num * i
    dikha ans
    i = i + 1
khatam`,
  },
  {
    id: "factorial",
    name: "Factorial Calculation (5!)",
    description: "Calculates 5! = 120 using a while loop",
    category: "Algorithms",
    code: `# Factorial of 5

rakh n = 5
rakh fact = 1
rakh temp = n

jabtak temp > 0
    fact = fact * temp
    temp = temp - 1
khatam

dikha "Factorial of 5 is:"
dikha fact`,
  },
  {
    id: "even-odd",
    name: "Even or Odd Check (Sama / Visama)",
    description: "Uses modulo operator % to test parity",
    category: "Math",
    code: `# Even or Odd test

rakh num = 17

agar num % 2 == 0
    dikha "Sama sankhya ba (Even)"
nahin
    dikha "Visama sankhya ba (Odd)"
khatam`,
  },
];
