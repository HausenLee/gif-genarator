export default {
    filterElements(eles, types) {
        if(!(eles instanceof Array)) {
            console.error('eles 必须为数组');
            return [];
        }
        const tags = types instanceof Array ? types : types instanceof Array ? [types] : null;

        if(tags) {
            console.log('types 必须为数组或者字符串');
            return
        }
        return eles.filter(item => {
            return types.includes(item.type);
        });
    }
}