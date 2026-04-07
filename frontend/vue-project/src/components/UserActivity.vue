<script setup>
const activity = [
    { id: 1, user: 'anna_hansen', quiz: 'JavaScript Grundlæggende', date: '2026-04-07 10:15', duration: '12 min', score: '85%', status: 'Gennemført' },
    { id: 2, user: 'peter_nielsen', quiz: 'React Hooks', date: '2026-04-07 09:30', duration: '18 min', score: '92%', status: 'Gennemført' },
    { id: 3, user: 'marie_jensen', quiz: 'CSS Flexbox & Grid', date: '2026-04-07 08:45', duration: '15 min', score: '78%', status: 'Gennemført' },
    { id: 4, user: 'lars_andersen', quiz: 'JavaScript Grundlæggende', date: '2026-04-06 16:20', duration: '10 min', score: '65%', status: 'Gennemført' },
    { id: 5, user: 'sofie_petersen', quiz: 'Node.js & Express', date: '2026-04-06 14:10', duration: '25 min', score: '88%', status: 'Gennemført' },
    { id: 6, user: 'mikkel_christensen', quiz: 'React Hooks', date: '2026-04-06 11:30', duration: '20 min', score: '95%', status: 'Gennemført' }
]
</script>

<template>
    <section class="module-card">
        <div class="module-header">
            <div>
                <h2>Brugeraktivitet Log</h2>
                <p>Se hvem der tager hvilken quiz, hvornår, hvor længe og med hvilket resultat</p>
            </div>
        </div>

        <table class="data-table">
            <thead>
                <tr>
                    <th>Bruger</th>
                    <th>Quiz</th>
                    <th>Dato & Tid</th>
                    <th>Varighed</th>
                    <th>Score</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in activity" :key="item.id">
                    <td>{{ item.user }}</td>
                    <td>{{ item.quiz }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.duration }}</td>
                    <td>{{ item.score }}</td>
                    <td>
                        <span class="badge badge-green">{{ item.status }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.module-card {
    margin-top: 20px;
    padding: 24px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 16px;
}

.module-header {
    margin-bottom: 24px;
}

.module-header h2 {
    margin: 0;
    font-size: 20px;
}

.module-header p {
    margin: 4px 0 0;
    color: #666;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    text-align: left;
    padding: 14px 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
}

.badge-green {
    background: #dcfce7;
    color: #166534;
}
</style>