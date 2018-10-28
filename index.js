const Joi = require('joi');
const express = require('express');
const app = express();

const employees = [
    { empID: 1, empName: 'Tasleem' },
    { empID: 2, empName: 'Shakeeb' },
    { empID: 3, empName: 'Harshul' },
];

app.get('/', (req, res) => {
    res.send('Hello World !!!!!!');
});

app.get('/api/employees', (req, res) => {
    res.send(employees);
});

app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.empID === parseInt(req.params.id));
    if (!employee) res.status(404).send('The employee with given ID does not exists.');
    res.send(employee);
});

app.post('/api/employees', (req, res) => {
    const schema = {
        empName: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    console.log(result);

    const employee = {
        empID: employees.length + 1,
        empName: req.body.empName
    };

    employees.push(employee);
    res.send(employee);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}...`));

// app.post();
// app.put();
// app.delete();
    

