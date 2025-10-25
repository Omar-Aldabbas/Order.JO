import FAQ1 from '../assets/images/faq1.png'
import FAQ2 from '../assets/images/faq2.png'
import FAQ3 from '../assets/images/faq3.png'

export const FAQS = [
  {
    id: 1,
    question: 'How does Order.JO work?',
    answers: [
      {
        id: 1,
        title: 'place an order',
        img: FAQ1,
        text: 'Place order through our website or Mobile app',
      },
      {
        id: 2,
        title: 'track  progress',
        img: FAQ2,
        text: 'Your can track your order status with delivery status',
      },
      {
        id: 3,
        title: 'get your order!',
        img: FAQ3,

        text: 'Receive your order at a lighting fast speed!',
      },
    ],
    moreInfo: `Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!`,
  },
  {
    id: 2,
    question: 'What payment methods are accepted?',
    answers: [
      {
        id: 1,
        title: 'Cash on Delivery',
        img: '',
        text: 'You can pay directly to the delivery courier when receiving your order.',
      },
      {
        id: 2,
        title: 'Click',
        img: '',
        text: 'Transfer between users, courier, or restaurants via our secure in-app feature.',
      },
    ],
    moreInfo:
      'We strive to make payments simple and secure for all users. More options may be added soon!',
  },
  {
    id: 3,
    question: 'Can I track my order in real-time?',
    answers: [
      {
        id: 1,
        title: 'Order Tab',
        img: '',
        text: 'Go to your "Orders" tab to see the current status of your deliveries.',
      },
      {
        id: 2,
        title: 'Notifications',
        img: '',
        text: 'Receive real-time notifications when your order is prepared, picked up, and delivered.',
      },
    ],
    moreInfo: 'Real-time tracking ensures you always know where your food is.',
  },
  {
    id: 4,
    question: 'Are there any special discounts or promotions available?',
    answers: [
      {
        id: 1,
        title: 'Promotions',
        img: '',
        text: 'Currently, we are working on promotions and discounts features.',
      },
    ],
    moreInfo:
      'You will be notified of any discounts or special promotions once they are available. Stay tuned!',
  },
  {
    id: 5,
    question: 'Is Order.JO available in my area?',
    answers: [
      {
        id: 1,
        title: 'Check Coverage',
        img: '',
        text: 'You can check your city in the app to see if Order.JO operates there.',
      },
    ],
    moreInfo:
      'We are expanding constantly. If your city is not listed, please stay tuned for updates!',
  },
]
