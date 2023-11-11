import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';

export function useStripe() {
  const config = useRuntimeConfig();
  const stripe = ref<Stripe | null>(null);

  async function initStripe(): Promise<void> {
    const stripeCore = await loadStripe(config.public.PUBLISH_KEY as string);
    stripe.value = stripeCore;
  }
  
  function setCardElement(elementToMount: string | HTMLElement): Promise<StripeCardElement> {
    return new Promise(async (resolve, reject) => {
      try {
        const elements = stripe.value!.elements();
        const card = elements!.create('card');
        card.mount(elementToMount);
        resolve(card);
      } catch (error) {
        reject(error);
      }
    });
  }

  function submitPayment(cardElement: StripeCardElement): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await stripe.value!.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen',
          },
        })
        if (result?.error) throw result.error;
        resolve();
        console.log(resolve())
      } catch (error) {
        reject(error);
      }
    });
  }

  function confirmPaymentIntent(paymentIntent: string, cardElement: StripeCardElement, ownerName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await stripe.value!.confirmCardPayment(paymentIntent, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: ownerName
            }
          }
        });
        if (result?.error) throw result.error;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    initStripe,
    setCardElement,
    confirmPaymentIntent,
    submitPayment
  }
}