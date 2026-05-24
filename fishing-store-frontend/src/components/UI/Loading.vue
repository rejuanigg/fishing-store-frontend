<template>
  <section class="app-loader">
    <div class="loader-blur loader-blur-one"></div>
    <div class="loader-blur loader-blur-two"></div>

    <div class="loader-card">
      <div class="loader-icon">
        <div class="loader-spinner"></div>
        <div class="loader-dot"></div>
      </div>

      <div class="loader-content">
        <span class="loader-kicker">Cargando</span>

        <h2>Preparando la información</h2>

        <p>Estamos cargando los datos necesarios para continuar.</p>

        <div class="loader-bar">
          <span></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.app-loader {
  position: relative;
  display: flex;
  min-height: 100dvh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #eff6ff, #f8fafc, #dbeafe);
  padding: 24px;
}

.loader-blur {
  position: absolute;
  border-radius: 999px;
  filter: blur(58px);
  pointer-events: none;
}

.loader-blur-one {
  top: 12%;
  right: -90px;
  width: 230px;
  height: 230px;
  background: rgba(59, 130, 246, 0.18);
}

.loader-blur-two {
  bottom: 10%;
  left: -90px;
  width: 250px;
  height: 250px;
  background: rgba(147, 197, 253, 0.28);
}

.loader-card {
  position: relative;
  z-index: 1;
  width: min(100%, 380px);
  border: 1px solid rgba(191, 219, 254, 0.8);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 55px rgba(30, 64, 175, 0.12);
  backdrop-filter: blur(18px);
  padding: 34px 26px 28px;
  text-align: center;
}

.loader-icon {
  position: relative;
  display: flex;
  width: 78px;
  height: 78px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 999px;
  background: #dbeafe;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.loader-spinner {
  position: absolute;
  width: 58px;
  height: 58px;
  border: 4px solid rgba(147, 197, 253, 0.6);
  border-top-color: #2563eb;
  border-radius: 999px;
  animation: spin 0.9s linear infinite;
}

.loader-dot {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #2563eb;
  box-shadow: 0 0 18px rgba(37, 99, 235, 0.35);
}

.loader-content {
  margin-top: 24px;
}

.loader-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #eff6ff;
  padding: 7px 12px;
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.loader-content h2 {
  margin: 14px 0 0;
  color: #172554;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1.15;
}

.loader-content p {
  margin: 10px auto 0;
  max-width: 290px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
}

.loader-bar {
  position: relative;
  height: 7px;
  margin-top: 24px;
  overflow: hidden;
  border-radius: 999px;
  background: #dbeafe;
}

.loader-bar span {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -35%;
  width: 35%;
  border-radius: inherit;
  background: linear-gradient(90deg, #93c5fd, #2563eb);
  animation: loading-bar 1.4s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading-bar {
  0% {
    left: -35%;
  }

  55% {
    left: 45%;
  }

  100% {
    left: 100%;
  }
}

@media (max-width: 380px) {
  .app-loader {
    padding: 18px;
  }

  .loader-card {
    border-radius: 26px;
    padding: 30px 22px 26px;
  }

  .loader-content h2 {
    font-size: 20px;
  }

  .loader-content p {
    font-size: 13px;
  }
}
</style>
