const jsBeautify = require('js-beautify')
const convert    = require('xml-js')

const convertBtn = document.querySelector('#convertBtn')
const sampleBtn  = document.querySelector('#sampleBtn')
const output = document.querySelector('#output')
const input  = document.querySelector('#input')

convertBtn.addEventListener('click', convertToSVG)
sampleBtn.addEventListener('click', copySample)


function convertToSVG() {
  if (input.value === '') return

  const xmlDoc = convert.xml2json(input.value, {
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreComment: true,
    ignoreDoctype: true,
    ignoreCdata: true,
    nativeType: true,
    ignoreText: true,
    compact: false,
    spaces: 2
  })

  output.innerHTML = json2h(JSON.parse(xmlDoc).elements[0])
}

function attr2h(json) {
  const attrs = json.attributes

  if (!attrs) {
    return undefined
  }

  const cleanAttrs = JSON.stringify(objFilter(attrs, unallowedAttributes)).replace(/"/g, `'`)
  return ` { attrs: ${jsBeautify.js_beautify(cleanAttrs)} }`
}


function json2h(json) {
  if (json.name === 'title') {
    return
  }

  const childrenTest = json.elements.reduce((acc, child) => {
    if (!child.elements) {
      const childWithoutChildren = `h('${child.name}',${attr2h(child)})`

      if (!unallowedTags.includes(child.name)) {
        acc.push(childWithoutChildren)
      }
    } else {
      const ch = json2h(child)
      if (ch !== '') {
        acc.push(ch)
      }
    }

    return acc
  }, []).join(',\n')

  const vSvg = `h('${json.name}',${attr2h(json) ? attr2h(json)+',' : ''} [\n${childrenTest}\n])`

  return jsBeautify.js_beautify(vSvg)
}


// Sample
function copySample() {
  input.innerHTML = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
    <title>Shape</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path d="M16.6911824,7.878386 L9.2472226,0.4344663 C8.9577787,0.144782 8.6107424,0 8.2067143,0 C7.8102158,0 7.4672245,0.144782 7.1775403,0.4344663 L6.3200221,1.2920245 C6.0302978,1.5664897 5.8854757,1.909521 5.8854757,2.3211986 C5.8854757,2.7327961 6.0302978,3.0758274 6.3200221,3.3503726 L9.6703547,6.7120795 L1.6202728,6.7120795 C1.2239745,6.7120795 0.9018895,6.8549792 0.654138,7.1408987 C0.4063865,7.4268182 0.2825107,7.771772 0.2825107,8.1756798 L0.2825107,9.6393602 C0.2825107,10.0433882 0.4064265,10.3882218 0.654138,10.6741413 C0.9018494,10.9600608 1.2239745,11.1028403 1.6202728,11.1028403 L9.6701945,11.1028403 L6.3199019,14.4533732 C6.0301776,14.7428572 5.8853555,15.0897734 5.8853555,15.4939216 C5.8853555,15.8979896 6.0301776,16.2448658 6.3199019,16.5343498 L7.1774201,17.391908 C7.4748341,17.6739827 7.8178254,17.815 8.2065942,17.815 C8.6030527,17.815 8.9500089,17.6739827 9.2471425,17.391908 L16.6910623,9.9479883 C16.973137,9.6659136 17.1142744,9.3191576 17.1142744,8.9074399 C17.1142744,8.4882328 16.973137,8.1450413 16.6911824,7.878386 Z" id="Shape" fill="#FFFFFF" fill-rule="nonzero"></path>
        <g>
          <circle id="Path_0" fill="#FFFFFF" fill-rule="nonzero" points="19.8 7.2 12.6 7.2 12.6 0 7.2 0 7.2 7.2 0 7.2 0 12.6 7.2 12.6 7.2 19.8 12.6 19.8 12.6 12.6 19.8 12.6"></circle>
          <g>
            <g>
              <polygon id="Path_1" fill="#FFFFFF" fill-rule="nonzero" points="19.8 7.2 12.6 7.2 12.6 0 7.2 0 7.2 7.2 0 7.2 0 12.6 7.2 12.6 7.2 19.8 12.6 19.8 12.6 12.6 19.8 12.6"></polygon>
            </g>
          </g>
       </g>
    </g>
</svg>
`
}


// Utils 
const unallowedTags = [ 'title', 'desc', 'defs' ]
const unallowedAttributes = [ 'id', 'version', 'xmlns:xlink', 'xmlns' ]

const objFilter = (obj, unallowedKeys) =>
  Object.keys(obj)
    .filter(key => !unallowedKeys.includes(key))
    .reduce((_obj, key) => {
      _obj[key] = obj[key]
      return _obj
    }, {})

