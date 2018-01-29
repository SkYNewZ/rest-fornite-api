module.exports = {
  // resize store object and add picture path
  convert: (store, url) => {
    return new Promise((resolve) => {

      store.storefronts.forEach((storefront) => {
        // change only the BRDailyStorefront and BRWeeklyStorefront
        if (storefront.name === "BRDailyStorefront" || storefront.name === "BRWeeklyStorefront") {
          var catalogEntries = storefront.catalogEntries;
          catalogEntries.forEach((catalogEntry, index) => {
            catalogEntries[index] = {
              devName: catalogEntry.devName,
              offerId: catalogEntry.offerId,
              prices: catalogEntry.prices,
              picturePath: url + "/static/store/" + catalogEntry.devName.replace(/ /g, "_") + ".png"
            }
          })
        }
      });
      resolve(store);
    });
  }
};