module.exports = {
  // resize store object and add picture path
  convert: (store, url) => {
    return new Promise((resolve) => {
      var newStoreFront = [];
      store.storefronts.forEach((storefront) => {
        // keep only the BRDailyStorefront and BRWeeklyStorefront
        if (storefront.name === "BRDailyStorefront" || storefront.name === "BRWeeklyStorefront") {
          var newCatalogEntries = [];
          storefront.catalogEntries.forEach((catalogEntry, index) => {
            newCatalogEntries.push({
              devName: catalogEntry.devName,
              offerId: catalogEntry.offerId,
              prices: catalogEntry.prices,
              picturePath: url + "/static/store/" + catalogEntry.devName.replace(/ /g, "_") + ".png"
            })
          });
          newStoreFront.push({
            name: storefront.name,
            catalogEntries: newCatalogEntries
          });
        }
      });
      store.storefronts = newStoreFront;
      resolve(store);
    });
  }
};
