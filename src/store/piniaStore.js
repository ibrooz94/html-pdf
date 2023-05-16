import { defineStore } from "pinia";
import { useLocalStorage, useSessionStorage } from "@vueuse/core"

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { 
      signedInUserRole:  useLocalStorage('signedInUserRole', ''),
      signedInUserEmail:  useLocalStorage('signedInUserEmail', ''),
      rfqNo:  useLocalStorage('rfqNo', ''),
      expirationDate: useLocalStorage('expirationDate', ''),
      testDocument3: useSessionStorage('testDocument3', ''),
      biddersRFQ: useLocalStorage('biddersRFQ', ''),
      bidderId: useLocalStorage('bidderId', ''),
     };
  },
  persist: true
});