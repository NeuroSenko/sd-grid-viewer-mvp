const dimensionX = [
  'sitting',
  'standing',
  'squatting',
  'rabbit pose',
  'bent over',
  'leaning forward',
  'paw pose',
  'claw pose',
  'crossed legs',
  'ojou-sama pose',
  'fighting stance',
  'legs apart',
  'arms up',
  'arms behind back',
  'arms behind head',
  'hands on hips',
  'hands up',
  'all fours',
  'hands between legs',
  'covering mouth',
  'outstretched arms',
  'top-down bottom-up',
  'on back',
  'on stomach',
  'lying',
  'on side',
  'standing on one leg',
];

const dimensionY = Array.from({ length: 151 - 70 }, (v, k) => k + 70);

const firstImageNumber = 8568;

const fileNameLenght = 140;

const imageWidth = 512;

const imageHeight = 896;


const imagePathPattern =
  "/assets/images/shinobu/*NUMBER*-*Y*-(*X*), (masterpiece) best quality, cinematic light, highly detailed, blush, blonde hair, yellow eyes, (very long hair), bangs,.png"

const extension = '.png';

const getXLabelFn = (x) => x;
const getYLabelFn = (y) => `Seed: ${y}`;


const getImagePath = (x, y) => {
  const imageNumber = firstImageNumber + x + y * dimensionX.length;

  const fileFullName = imagePathPattern
    .replace('*NUMBER*', imageNumber.toString().padStart(5, '0'))
    .replace('*X*', dimensionX[x])
    .replace('*Y*', dimensionY[y]);

  const fileNameOnlyStartIndex = fileFullName.lastIndexOf('/');
  const fileNameOnly = fileFullName.slice(fileNameOnlyStartIndex).slice(0, -extension.length);

  const fileNameOnlyShorten = fileNameOnly
    .slice(0, fileNameLenght + dimensionY[y].toString().length - extension.length)
    .trim()
    .concat(extension);

  const fullFileNameShorten = fileFullName.slice(0, fileNameOnlyStartIndex) + fileNameOnlyShorten;

  if (dimensionX[x] === 'lying') {
    console.log({ y: dimensionY[y].toString().length, fileFullName, fileNameOnlyStartIndex, fileNameOnly, fileNameOnlyShorten, fullFileNameShorten })
  }
  return fullFileNameShorten;
}

const topHeadersNode = document.getElementById('topHeaders')
dimensionX.forEach((val) => {
  const headerNode = document.createElement('div');
  headerNode.className = 'top-headers__item';
  headerNode.innerText = getXLabelFn(val);

  topHeadersNode.appendChild(headerNode);
});

const leftHeadersNode = document.getElementById('leftHeaders')
dimensionY.forEach((val) => {
  const headerNode = document.createElement('div');
  headerNode.className = 'left-headers__item';
  headerNode.innerText = getYLabelFn(val);

  leftHeadersNode.appendChild(headerNode);
});

const imgContainerNode = document.getElementById('imgContainer')
for (let y = 0; y < dimensionY.length; y++) {
  for (let x = 0; x < dimensionX.length; x++) {
    const imgNode = document.createElement('img');
    imgNode.loading = 'lazy';
    imgNode.width = imageWidth;
    imgNode.height = imageHeight;
    imgNode.src = getImagePath(x, y);

    imgContainerNode.appendChild(imgNode);

  }
}

const appRootNode = document.getElementById('appRoot');

setInterval(() => {
  leftHeadersNode.style.transform = `translateY(-${appRootNode.scrollTop}px)`
  topHeadersNode.style.transform = `translateX(-${appRootNode.scrollLeft}px)`
}, 10)