import { Item, GildedRose } from "../app/gilded-rose";

const transformItem = (items, days) => {
  const gildedRose = new GildedRose(items);
  for(let i = 0; i < days; i++)
    gildedRose.updateQuality();

  return items
}

describe("Item normal", () => {
  it("Comprueba la calidad y fecha de caducidad de un item normal en el día 1", function () {        
    const items = transformItem([new Item("Elixir of the Mongoose", 5, 7)],1)
    expect(items[0].name).toEqual("Elixir of the Mongoose");
    expect(items[0].quality).toEqual(6);
    expect(items[0].sellIn).toEqual(4);
  });
  it("Comprueba que, una vez caducado, la calidad de un item normal, se degrada dos puntos cada día sellIn se reduce en 1", function () {        
    const items = transformItem([new Item("Elixir of the Mongoose", 0, 7)],2)
    expect(items[0].quality).toEqual(3);
    expect(items[0].sellIn).toEqual(-2);
  });
  it("Comprueba que, si aún no ha caducado, el item se degrada en 1 por cada día y sellIn se reduce en 1.", function () {        
    const items = transformItem([new Item("Elixir of the Mongoose", 3, 7)],2)
    expect(items[0].quality).toEqual(5);
    expect(items[0].sellIn).toEqual(1);
  });
  it("Comprueba la calidad nunca sea menor que 0", function () {        
    const items = transformItem([new Item("Elixir of the Mongoose", 1, 7)],100)
    expect(items[0].quality).toEqual(0);
  });
  // TODO: El programa no esepera que existan item normales con calidad inicial superior a 50. Implementar comprobación
  it.skip("Comprueba que la calidad máxima de un item no puede ser superior a 50", function () {        
    const items = transformItem([new Item("Elixir of the Mongoose", 3, 52)],1)
    expect(items[0].quality).toEqual(50);
  });
})

describe("Item Queso brie", () => {
  it("Comprueba la calidad y fecha de caducidad de un queso brie en el día 1", function () {        
    const items = transformItem([new Item("Aged Brie", 5, 7)],1)
    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].quality).toEqual(8);
    expect(items[0].sellIn).toEqual(4);
  });
  it("Comprueba que, una vez caducado, la calidad de un queso brie, mejora dos puntos cada día y sellIn se reduce en 1", function () {        
    const items = transformItem([new Item("Aged Brie", 0, 7)],2)
    expect(items[0].quality).toEqual(11);
    expect(items[0].sellIn).toEqual(-2);
  });
  it("Comprueba que, si aún no ha caducado, el Aged Brie aumenta en 1 por cada día y sellIn se reduce en 1.", function () {        
    const items = transformItem([new Item("Aged Brie", 3, 7)],2)
    expect(items[0].quality).toEqual(9);
    expect(items[0].sellIn).toEqual(1);
  });

  it("Comprueba que la calidad máxima de un Aged Brie no puede ser superior a 50", function () {        
    const items = transformItem([new Item("Aged Brie", 3, 45)], 10)
    expect(items[0].quality).toEqual(50);
  });
})

describe("Item Sulfuras ", () => { 
  it("Comprueba que, una vez caducado, la calidad del item Sulfuras no se modifica después de caducar", function () {        
    const items = transformItem([new Item("Sulfuras, Hand of Ragnaros", 0, 80)],2)
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(0);
  });
  it("Comprueba que, si aún no ha caducado, el item Sulfuras no modifica su calidad ni fecha de venta.", function () {        
    const items = transformItem([new Item("Sulfuras, Hand of Ragnaros", 20, 80)],2)
    expect(items[0].quality).toEqual(80);
    expect(items[0].sellIn).toEqual(20);
  });
})

describe("Item Entrada al backstage", () => {
  it("Si faltan más de 10 días para la fecha de venta, la calidad se aumenta en 1 y la fecha de venta se reduce en 1", function () {        
    const items = transformItem([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)],1)
    expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].quality).toEqual(21);
    expect(items[0].sellIn).toEqual(14);
  });
  it("Si faltan entre cinco y diez días para el evento, la calidad aumenta en dos puntos cada día y sellIn se reduce en 1", function () {        
    const items = transformItem([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 20)],2)
    expect(items[0].quality).toEqual(24);
    expect(items[0].sellIn).toEqual(6);
  });
  it("Si faltan menos de 5 días para la fecha de venta, la calidad aumenta en 3 y la fecha de venta se reduce en 1", function () {        
    const items = transformItem([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)],1)
    expect(items[0].quality).toEqual(23);
    expect(items[0].sellIn).toEqual(4);
  });
  it("Comprueba que la calidad es 0, cuando sellIn es negativo", function () {        
    const items = transformItem([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)],20)
    expect(items[0].quality).toEqual(0);
  });
})

describe("Item Conjured", () => { 
  it("Comprueba que, una vez caducado, la calidad se reduce 4 cada día y la fecha de venta se reduce en 1", function () {        
    const items = transformItem([new Item("Conjured Mana Cake", 0, 10)],2)
    expect(items[0].quality).toEqual(2);
    expect(items[0].sellIn).toEqual(-2);
  });
  it("Comprueba que, si aún no ha caducado, el item se degrada en 2 por cada día y sellIn se reduce en 1.", function () {        
    const items = transformItem([new Item("Conjured Mana Cake", 3, 7)],2)
    expect(items[0].quality).toEqual(3);
    expect(items[0].sellIn).toEqual(1);
  });
  it("Comprueba la calidad nunca sea menor que 0", function () {        
    const items = transformItem([new Item("Conjured Mana Cake", 1, 7)],100)
    expect(items[0].quality).toEqual(0);
  });
})