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
  return [...mainMetaObjects, ...addonsMetaObjects, ...cardMetaObjects];
}

function getBoxDescription(items){
  console.log('getting box description');
  const boxDescription = {};
  boxDescription['Box'] = items.main.title;
  boxDescription['Addons'] = items.addons.map((item) => {
    return `${item.quantity}x${item.title}`;
  }).join('\n');
  boxDescription['Card'] = `${items.card.title}
  Message:${items.card.message}`;
  return boxDescription;
}

module.exports.getMetaFields = getMetaFields;
module.exports.getBoxDescription = getBoxDescription;