## API Docs
---
#### Student

- GET `/student`
    desc: Returns all students
    body: `None`
    return `Student[]`
- GET `/student/available`
    desc: Returns students not assigned to trainers
    body: `None`
    return `Student[]`
- POST `/student/new` 
    desc: Creates a student with provided lastname
    body: `{ lastname: string }`
    return `Student`

#### Trainer

- GET `/trainer`
    desc: Returns all trainers
    body: `None`
    return `Trainer[]`
- GET `/trainer/available`
    desc: Returns trainers with space for students
    body: `None`
    return `Trainer[]`
- POST `/trainer/new` 
    desc: Creates a trainer with provided lastname and capacity
    body: `{ lastname: string, capacity: number }`
    return `Trainer`
- POST `/trainer/assign` 
    desc: Assigns student to trainer and returns both
    body: `{ studentId: string, trainerId: string }`
    return `{Trainer, Student}`
- DELETE `/trainer/delete/:id`
    desc: Deletes a trainer with provided id and assigns its students to another trainer and returns it
    body: `None`
    return `Trainer`
- PATCH `/trainer/update/:id`
    desc: Updates a trainer with provided id and updates its fields by those provided in body. Capacity can error to an overflow. Returns updated trainer
    body: `{ lastname: string, capacity: number }`
    return `Trainer`
