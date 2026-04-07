export const mockQuizSession = {
    sessionId: 'sess_mock_static',
    quiz: {
        quizId: 'css-quiz-demo',
        quizName: 'CSS Quiz Demo',
        difficulty: 'Let',
        numberOfQuestions: 3
    },
    questions: [
        {
            questionId: 'demo-q1',
            type: 'single',
            questionNumber: 1,
            totalQuestions: 3,
            questionHtml: 'Hvad står <strong>CSS</strong> for?',
            options: [
                { optionId: 'opt1', textHtml: 'Creative Style System' },
                { optionId: 'opt2', textHtml: 'Cascading Style Sheets' },
                { optionId: 'opt3', textHtml: 'Computer Style Syntax' },
                { optionId: 'opt4', textHtml: 'Colorful Style Sheets' }
            ]
        },
        {
            questionId: 'demo-q2',
            type: 'multiple',
            questionNumber: 2,
            totalQuestions: 3,
            questionHtml: 'Hvilke af følgende er <strong>gyldige CSS-selektorer</strong>?',
            options: [
                { optionId: 'opt1', textHtml: '.menu' },
                { optionId: 'opt2', textHtml: '#header' },
                { optionId: 'opt3', textHtml: '&main' },
                { optionId: 'opt4', textHtml: 'button' }
            ]
        },
        {
            questionId: 'demo-q3',
            type: 'cloze',
            questionNumber: 3,
            totalQuestions: 3,
            questionHtml: 'Hvilken værdi bruges i <strong>display</strong> for at aktivere flexbox?'
        }
    ]
}