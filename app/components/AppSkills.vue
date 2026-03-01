<template>
  <section class="flex my-0 flex-col text-white">

    <h2 class="text-4xl font-light text-center text-primary my-8">
      Как я работаю
    </h2>
      <div class="max-w-7xl mx-auto px-4 mb-30">


        <div class="flex flex-col md:flex-row lg:flex-row items-center lg:items-start justify-between gap-12">

          <div data-aos="fade-up" class="text-center px-4 lg:max-w-sm
          bg-none backdrop-blur-md
          ">
            <img src="/images/backend.png" alt="audit" class="h-28 mx-auto mb-6" />

            <h3 class="text-xl font-bold mb-4">
              Аудит системы
            </h3>

            <p class="text-gray-300 leading-6">
              Отрисовка бизнес процессов, составление карты инфраструктуры. Выявление проблемных мест и построение плана
              для дальнейшей оптимизации.
            </p>
          </div>

          <div data-aos="fade-up" class="text-center px-4 lg:max-w-sm
          bg-none backdrop-blur-sm
          ">

            <img src="/images/frontend.png" alt="it-infra" class="h-28 mx-auto mb-6" />

            <h3 class="text-center font-bold mb-4">
              Формирование единой экосистемы
            </h3>

            <p class="text-gray-300 leading-6">
              Разработка и внедрение сервисов (Typescript, Python).
              Автоматизации рутинных действий, написание pipeline'ов (Gitlab Ci, Ansible, Bash, Power shell, Python).
              Упаковка сервисов в docker контейнеры.
              Подключение систем мониторинга (Zabbix).
              Составление технической и пользовательской документаций.
              Формирования единой безопасной и отказоустойчивой IT-инфраструктуры.
            </p>
          </div>

          <div data-aos="fade-up" class="text-center px-4 lg:max-w-sm
          bg-none backdrop-blur-md
          ">
            <img src="/images/mobileapp.png" alt="admin" class="h-28 mx-auto mb-6" />

            <h3 class="text-xl font-bold mb-4">
              Сопровождение существующих решений
            </h3>

            <p class="text-gray-300 leading-6">
              Администрирование и сопровождение IT-инфраструктуры:
              Пользовательских сервисов, сетевого оборудования, web-серверов, баз данных, файловых серверов, скриптов,
              сi/cd и тд.
            </p>
          </div>

        </div>
      </div>
  </section>

</template>
