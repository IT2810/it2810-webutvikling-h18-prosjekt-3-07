import { countRemainingTasks, generateRemainingTaskText } from '../Utils/utils';

beforeAll( () => {
    let taskList = [];
});

describe('Returns correct text and number of remaining tasks when 2 tasks left', () => {
    beforeEach(() => {
        taskList = [
            {id: new Date(),
            text: "Test",
            completed: false},
            {id: new Date(),
            text: "Test",
            completed: false},
            {id: new Date(),
            text: "Test",
            completed: true}];
        
        return taskList;
    });

    test('Returns 2 remaining tasks', () => {
        const remainingTasks = countRemainingTasks(taskList);
        expect(remainingTasks).toBe(2); 
    });

    test('Generates correct text if more than 1 remaining task in list', () => {
        const generatedText = generateRemainingTaskText(2, taskList);
        expect(generatedText).toBe("You have 2 tasks left. Keep going! 💪");
    });
});

describe('Returns correct text and number of tasks when 0 tasks left', () => {
    beforeEach(() => {
        taskList = [
            {id: new Date(),
            text: "Test",
            completed: true},
            {id: new Date(),
            text: "Test",
            completed: true},
            {id: new Date(),
            text: "Test",
            completed: true}];
    })

    test('Returns 0 remaining tasks', () => {
        const remainingTasks = countRemainingTasks(taskList);
        expect(remainingTasks).toBe(0);
    });
    
    test('Generates correct text if all tasks are completed', () => { 
        const generatedText = generateRemainingTaskText(0,taskList);
        expect(generatedText).toBe("You have completed all your task! Wohoo 👏");
    });
    
});

test('Generates correct text if no tasks in list', () => {
    taskList = [];
    const generatedText = generateRemainingTaskText(0,taskList);
    expect(generatedText).toBe("Maybe you should add some tasks? 🤔");
   
});

test('Generates correct text if 1 remaining task in list', () => {
    const taskList = [
        {id: new Date(),
        text: "Test",
        completed: false},
        {id: new Date(),
        text: "Test",
        completed: false},
        {id: new Date(),
        text: "Test",
        completed: true}];
    
    const generatedText = generateRemainingTaskText(1, taskList);

    expect(generatedText).toBe("You have 1 task left. Almost there 😃");
   
});
