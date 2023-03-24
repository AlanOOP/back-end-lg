import braintree from "braintree";

  let gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "n74dc2kw9g3ws389",
    publicKey: "bgytmgzhz5f6t2tg",
    privateKey: "e6f226166da99d874f00008f0bba14fe",
  });

export default gateway;