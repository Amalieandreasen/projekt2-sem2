<template>
  <div class="info-box">
    <div class="info-title">
      <span class="material-symbols-rounded">info</span>
      <strong>Point-system:</strong>
    </div>

    <ul>
      <li><strong>Enkelt valg</strong>: Fuldt point for korrekt svar</li>
      <li><strong>Flere valg</strong>: Korrekte valg giver delpoint, forkerte valg trækker fra</li>
      <li><strong>Udfyld</strong>: Fuldt point for korrekt tekstsvar</li>
    </ul>
  </div>
</template>

<style scoped>
.info-box {
  background: #edf4ff;
  border: 1px solid #bfd3ff;
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  color: #1e3a8a;
}

.info-title {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.info-box ul {
  margin: 0;
  padding-left: 20px;
}

.info-box li {
  margin-bottom: var(--space-xs);
  line-height: 1.5;
}

.info-box li:last-child {
  margin-bottom: 0;
}
</style>