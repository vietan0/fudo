/**
 * @param {string} path
 * @returns {SVGElement}
 */
export default async function renderSvg(path) {
  const svgRes = await fetch(path);
  const svgText = await svgRes.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;

  return svgElement;
}
