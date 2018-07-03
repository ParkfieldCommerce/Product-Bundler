function getMetaObjects(item, type, index = ''){
  let metaObjects = [];
  Object.keys(item).forEach((key) =>{
    metaObjects.push({
      key: `${key}`,
      value:`${item[key]}`,
      value_type:"string",
      namespace:`${type + index}`
    })
  });
  return metaObjects;
}
function getMetaFields(items){
  const main = items.main;
  const addons = items.addons;
  const card = items.card;

  const mainMetaObjects = getMetaObjects(main, 'main');
  
  let addonsMetaObjects = [];
  addons.forEach((addon, index) => {
    let addonMetaObjects = getMetaObjects(addon,'addon', index);
    addonsMetaObjects = [...addonsMetaObjects,...addonMetaObjects]
  });

  const cardMetaObjects = getMetaObjects(card, 'card');
  //return [...mainMetaObjects, ...addonsMetaObjects, ...cardMetaObjects];
  return mainMetaObjects;
}

module.exports.getMetaFields = getMetaFields;