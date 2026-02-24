// ~/composables/useProjectModal.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectModal from '~/components/ProjectModal.vue'

gsap.registerPlugin(ScrollTrigger)
const overlay = useOverlay()


export const openProjectModal = async (projectName: any) => {
  const modal = overlay.create(ProjectModal, {
    props: { project: projectName }
  })

  modal.open() // открываем модалку

  // ждем пока компонент реально отрендерится
  await nextTick()

  // находим картинку внутри модалки и добавляем GSAP
  const img = document.querySelector<HTMLImageElement>('img#projectImage')
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.5, y: 0 },
      {
        scale: 1,
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  }
}
