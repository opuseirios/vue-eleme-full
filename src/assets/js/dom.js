export function getData(el,attr,value) {
  const prefix = 'data-';
  attr = prefix+attr;
  if(value){
    return el.setAttribute(attr,name)
  }else {
    return el.getAttribute(attr);
  }
}
