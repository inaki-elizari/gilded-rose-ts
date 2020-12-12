export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }    
}

export class GildedRose {
    items: Array<Item>;
    
    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    isAgedBrie(item: Item) {
        if(item.name === 'Aged Brie'){
            return true
        }
        return false
    }
    isBackstage(item: Item) {
        if(item.name === 'Backstage passes to a TAFKAL80ETC concert'){
            return true
        }
        return false
    }
    isSulfuras(item: Item) {
        if(item.name === 'Sulfuras, Hand of Ragnaros'){
            return true
        }
        return false
    }
    isConjured(item: Item) {
        if(item.name === 'Conjured Mana Cake'){
            return true
        }
        return false
    }
    decreaseQuality(item: Item, quantity: number): number{
        let result = item.quality - quantity
        if(result < 0) result = 0
        return result
    }

    increaseQuality(item: Item, quantity: number): number{
        return item.quality + quantity
    }
    
    updateQuality() {
        //this.items.map((item) => console.log(item))
        //for (let i = 0; i < this.items.length; i++) {
        const result: Array<Item> = [];
        this.items.map((item) =>{
            
            //if(this.isSulfuras(item)){
            //    return result.push(item)                
            //}else{
                //item.sellIn -= 1;
                if(this.isAgedBrie(item)){

                }else if(this.isBackstage(item)){

                }else if(this.isConjured(item)){
                    if(item.sellIn > 0){
                        item.quality = this.decreaseQuality(item,1)
                    }else{
                        item.quality = this.decreaseQuality(item,2)
                    }
                    
                }else{
                }
                
           // }

            if (!this.isAgedBrie(item) && !this.isBackstage(item)) {
                if (item.quality > 0) {
                    if (!this.isSulfuras(item) && !this.isConjured(item)){
                        item.quality = item.quality - 1
                    }
                    /*else if (this.isConjured(item)){
                        item.quality = item.quality - 2
                        if(item.quality < 0) {
                            item.quality = 0 
                        }
                    }*/
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                    if (this.isBackstage(item)) {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1
                            }
                        }
                    }
                }
            }
            if (!this.isSulfuras(item)) {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (!this.isAgedBrie(item)) {
                    if (!this.isBackstage(item)){
                        if (item.quality > 0) {
                            if (!this.isSulfuras(item) && !this.isConjured(item)) {
                                item.quality = item.quality - 1
                            }else if(this.isConjured(item)){
                                item.quality = item.quality - 2
                                if(item.quality < 0) {
                                    item.quality = 0 
                                }
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }
            result.push(item)
        })

        return this.items;
    }
}
