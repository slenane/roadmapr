export const DUMMY_ROADMAP = {
  books: [
    {
      author: 'Adam Freeman',
      description: 'Angular Book, shit\'s pretty good dawg but I can\'t seem to focus on it',
      endDate: new Date('01/02/2022'),
      link: 'https://amazon.com',
      publisher: 'Apress',
      stack: [
        { title: 'Angular', url: 'angularjs' },
        { title: 'Android', url: 'android' },
      ],
      startDate: new Date('05/02/2022'),
      title: 'Pro Angular',
      topics: ['Object-Oriented Programming'],
      type: 'book'
    }
  ],
  courses: [
    {
      description: 'This one is bound to get me a job',
      endDate: new Date('09/10/2022'),
      link: 'https://udemy.com',
      instructor: 'Colt Steele',
      provider: 'Udemy',
      stack: [
        { title: 'HTML', url: 'html5' },
        { title: 'CSS', url: 'css3' },
        { title: 'JavaScript', url: 'javascript' },
        { title: 'Bootstrap', url: 'bootstrap' },
        { title: 'MongoDB', url: 'mongodb' },
        { title: 'Node.js', url: 'nodejs' }
      ],
      startDate: new Date('05/10/2022'),
      title: 'Web Development Bootcamp',
      topics: ['Web Development', 'Functional Programming', 'Object-Oriented Programming'],
      type: 'course'
    }
  ],
  degrees: [
    {
      description: 'This was a long one alright',
      endDate: new Date('05/10/2022'),
      gpa: '3.5 GPA',
      link: 'http://nuig.com',
      institution: 'National University of Ireland, Galway',
      modules: ['This one', 'That one'],
      stack: [
        { title: 'HTML', url: 'html5' },
        { title: 'CSS', url: 'css3' },
        { title: 'JavaScript', url: 'javascript' },
        { title: 'Bootstrap', url: 'bootstrap' },
        { title: 'MongoDB', url: 'mongodb' },
        { title: 'Node.js', url: 'nodejs' }
      ],
      startDate: new Date('05/10/2018'),
      title: 'BSc. Computer Science',
      topics: ['Computers and that'],
      type: 'degree'
    }
  ],
  tutorials: [
    {
      description: 'A tutorial that got me a job',
      endDate: new Date('05/10/2022'),
      link: 'http://youtube.com',
      instructor: 'Traversy Media',
      github: 'http://github.com',
      provider: 'YouTube',
      stack: [
        { title: 'Angular', url: 'angularjs' },
      ],
      startDate: new Date('05/10/2018'),
      title: 'Angular ToDo List',
      topics: ['Project structure'],
      type: 'tutorial'
    }
  ],
};