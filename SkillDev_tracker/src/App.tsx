import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Circle, Save, RotateCcw } from 'lucide-react';

// Raw Data from the roadmap
const rawData = [
  {
    day: 1,
    skills: [
      { name: "Python", topics: ["What is Python, interpreter vs script", "Variables & dynamic typing", "print(), input()"] },
      { name: "Java Web Dev", topics: ["What is Java, JVM/JDK/JRE", "First Java program", "main() method anatomy"] },
      { name: "Problem Solving", topics: ["What is an algorithm?", "Steps: Input → Process → Output", "Dry run basics"] }
    ]
  },
  {
    day: 2,
    skills: [
      { name: "Python", topics: ["Data types: int, float, str, bool", "Type casting"] },
      { name: "Java Web Dev", topics: ["Primitive data types", "Variables & constants", "Type casting"] },
      { name: "Problem Solving", topics: ["Flowcharts", "Simple decision problems"] }
    ]
  },
  {
    day: 3,
    skills: [
      { name: "Python", topics: ["Operators (arith, logical, comparison)", "Expressions"] },
      { name: "Java Web Dev", topics: ["Operators & precedence", "Expressions"] },
      { name: "Problem Solving", topics: ["Conditional logic problems", "If–else mental models"] }
    ]
  },
  {
    day: 4,
    skills: [
      { name: "Python", topics: ["if, elif, else", "Nested conditions"] },
      { name: "Java Web Dev", topics: ["if, else if, switch"] },
      { name: "Problem Solving", topics: ["Real-life condition mapping", "Truth tables (intuitive)"] }
    ]
  },
  {
    day: 5,
    skills: [
      { name: "Python", topics: ["for loop", "range()"] },
      { name: "Java Web Dev", topics: ["for, while, do-while"] },
      { name: "Problem Solving", topics: ["Loop tracing", "Counting & accumulation problems"] }
    ]
  },
  {
    day: 6,
    skills: [
      { name: "Python", topics: ["while loop", "break, continue"] },
      { name: "Java Web Dev", topics: ["Loop control statements", "Nested loops"] },
      { name: "Problem Solving", topics: ["Pattern printing (easy)"] }
    ]
  },
  {
    day: 7,
    skills: [
      { name: "Python", topics: ["Strings basics", "Indexing & slicing"] },
      { name: "Java Web Dev", topics: ["String class basics", "charAt, length"] },
      { name: "Problem Solving", topics: ["String traversal logic"] }
    ]
  },
  {
    day: 8,
    skills: [
      { name: "Python", topics: ["Lists", "List indexing & iteration"] },
      { name: "Java Web Dev", topics: ["Arrays (1D)", "Array traversal"] },
      { name: "Problem Solving", topics: ["Array traversal problems"] }
    ]
  },
  {
    day: 9,
    skills: [
      { name: "Python", topics: ["List methods", "append, pop, sort"] },
      { name: "Java Web Dev", topics: ["Array operations", "Searching basics"] },
      { name: "Problem Solving", topics: ["Linear search logic"] }
    ]
  },
  {
    day: 10,
    skills: [
      { name: "Python", topics: ["Tuples & Sets", "When to use what"] },
      { name: "Java Web Dev", topics: ["Intro to Collections (high-level)", "Why collections exist"] },
      { name: "Problem Solving", topics: ["Set-based reasoning", "Duplicate detection logic"] }
    ]
  },
  {
    day: 11,
    skills: [
      { name: "Python", topics: ["Dictionaries", "Key-value thinking"] },
      { name: "Java Web Dev", topics: ["Classes & Objects", "Object creation"] },
      { name: "Problem Solving", topics: ["Mapping problems", "Frequency counting"] }
    ]
  },
  {
    day: 12,
    skills: [
      { name: "Python", topics: ["Functions", "Parameters & return values"] },
      { name: "Java Web Dev", topics: ["Methods", "Method overloading"] },
      { name: "Problem Solving", topics: ["Function decomposition", "Modular thinking"] }
    ]
  },
  {
    day: 13,
    skills: [
      { name: "Python", topics: ["Variable scope", "Local vs global"] },
      { name: "Java Web Dev", topics: ["Access modifiers", "public, private"] },
      { name: "Problem Solving", topics: ["Breaking big problems into steps"] }
    ]
  },
  {
    day: 14,
    skills: [
      { name: "Python", topics: ["Basic recursion (concept)", "Recursive call stack"] },
      { name: "Java Web Dev", topics: ["Recursion basics", "Base case logic"] },
      { name: "Problem Solving", topics: ["Recursive thinking", "Factorial / Fibonacci logic"] }
    ]
  },
  {
    day: 15,
    skills: [
      { name: "Python", topics: ["File handling basics", "Read/write text files"] },
      { name: "Java Web Dev", topics: ["Input handling", "Scanner class"] },
      { name: "Problem Solving", topics: ["Input-output edge cases"] }
    ]
  },
  {
    day: 16,
    skills: [
      { name: "Python", topics: ["Intro to numpy", "Arrays vs lists"] },
      { name: "Java Web Dev", topics: ["Packages", "Code organization"] },
      { name: "Problem Solving", topics: ["Space vs time thinking"] }
    ]
  },
  {
    day: 17,
    skills: [
      { name: "Python", topics: ["Intro to pandas", "DataFrame basics"] },
      { name: "Java Web Dev", topics: ["Exception handling", "try-catch"] },
      { name: "Problem Solving", topics: ["Error case analysis"] }
    ]
  },
  {
    day: 18,
    skills: [
      { name: "Python", topics: ["Basic data cleaning", "Missing values"] },
      { name: "Java Web Dev", topics: ["Intro to HTML", "Basic tags & structure"] },
      { name: "Problem Solving", topics: ["Constraint-based reasoning"] }
    ]
  },
  {
    day: 19,
    skills: [
      { name: "Python", topics: ["Data summary", "Mean, median, mode"] },
      { name: "Java Web Dev", topics: ["HTML forms", "Input fields"] },
      { name: "Problem Solving", topics: ["Edge case identification"] }
    ]
  },
  {
    day: 20,
    skills: [
      { name: "Python", topics: ["Mini data task (CSV → summary)"] },
      { name: "Java Web Dev", topics: ["End-to-end flow: HTML → Java logic (conceptual)"] },
      { name: "Problem Solving", topics: ["Solve 3 mixed problems", "Explain solution verbally"] }
    ]
  }
];

export default function RoadmapTracker() {
  // State for checkmarks, using localStorage key 'roadmap_progress_ir'
  const [completed, setCompleted] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('roadmap_progress_ir');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('roadmap_progress_ir', JSON.stringify(completed));
    }
  }, [completed, isLoaded]);

  const toggleComplete = (day, skillIndex) => {
    const key = `${day}-${skillIndex}`;
    setCompleted(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      setCompleted({});
    }
  };

  // Function to generate CSV structure
  const downloadCSV = () => {
    const header = ["Day", "Skill", "Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Completed"];
    const rows = [];

    rawData.forEach(dayItem => {
      dayItem.skills.forEach((skillItem, idx) => {
        const key = `${dayItem.day}-${idx}`;
        const isDone = completed[key] ? "Yes" : "No";
        
        // Pad topics to ensure 5 columns
        const paddedTopics = [...skillItem.topics];
        while (paddedTopics.length < 5) {
          paddedTopics.push("");
        }

        const row = [
          `Day ${dayItem.day}`,
          skillItem.name,
          ...paddedTopics,
          isDone
        ];
        
        // Escape quotes for CSV format
        const formattedRow = row.map(cell => `"${String(cell).replace(/"/g, '""')}"`);
        rows.push(formattedRow.join(","));
      });
    });

    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'phase1_roadmap_tracker_ir.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate stats
  const totalItems = rawData.length * 3;
  const completedItems = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight mb-2">
              PHASE-1: FOUNDATIONS
            </h1>
            <p className="text-slate-600 font-medium">
              20-Day Micro-Roadmap | Python • Java • Algorithms
            </p>
          </div>
          
          <div className="flex gap-3">
             <button 
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button 
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-all active:scale-95 font-semibold"
            >
              <Download size={18} /> Export CSV
            </button>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Overall Progress</span>
            <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-slate-400 mt-2">
            {completedItems} of {totalItems} modules completed
          </p>
        </div>

        {/* The "Spreadsheet" Table */}
        <div className="bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-r border-slate-200 w-24">Status</th>
                <th className="p-4 font-bold border-r border-slate-200 w-20">Day</th>
                <th className="p-4 font-bold border-r border-slate-200 w-32">Skill</th>
                <th className="p-4 font-bold border-r border-slate-200">Topic 1</th>
                <th className="p-4 font-bold border-r border-slate-200">Topic 2</th>
                <th className="p-4 font-bold border-r border-slate-200">Topic 3</th>
                <th className="p-4 font-bold border-r border-slate-200">Topic 4</th>
                <th className="p-4 font-bold">Topic 5</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rawData.map((dayItem) => (
                <React.Fragment key={dayItem.day}>
                  {dayItem.skills.map((skill, idx) => {
                    const uniqueKey = `${dayItem.day}-${idx}`;
                    const isCompleted = !!completed[uniqueKey];
                    const isLastSkill = idx === dayItem.skills.length - 1;
                    
                    return (
                      <tr 
                        key={uniqueKey} 
                        className={`
                          group transition-colors hover:bg-indigo-50 
                          ${isCompleted ? 'bg-green-50/50' : 'bg-white'}
                          ${isLastSkill ? 'border-b-2 border-slate-200' : 'border-b border-slate-100'}
                        `}
                      >
                        {/* Checkbox Column */}
                        <td className="p-4 border-r border-slate-200 text-center">
                          <button 
                            onClick={() => toggleComplete(dayItem.day, idx)}
                            className="focus:outline-none"
                          >
                            {isCompleted ? (
                              <CheckCircle className="text-green-500 w-6 h-6" />
                            ) : (
                              <Circle className="text-slate-300 group-hover:text-indigo-400 w-6 h-6" />
                            )}
                          </button>
                        </td>

                        {/* Day Column (merged logically via visual cleanliness) */}
                        <td className="p-4 border-r border-slate-200 font-bold text-slate-500">
                          {idx === 0 && (
                            <span className="bg-slate-200 px-2 py-1 rounded text-xs text-slate-700">
                              Day {dayItem.day}
                            </span>
                          )}
                        </td>

                        {/* Skill Column */}
                        <td className="p-4 border-r border-slate-200 font-semibold text-indigo-900">
                          {skill.name}
                        </td>

                        {/* Topic Columns 1-5 */}
                        {[0, 1, 2, 3, 4].map((topicIdx) => (
                          <td 
                            key={topicIdx} 
                            className={`p-4 border-r border-slate-100 ${topicIdx >= 3 ? 'bg-slate-50/50' : ''}`}
                          >
                            {skill.topics[topicIdx] || <span className="text-slate-300">-</span>}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm pb-8">
          © 2026 Irfan IR || Built with CURIOSITY
        </div>
      </div>
    </div>
  );
}