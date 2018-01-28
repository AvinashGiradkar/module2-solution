(function() {
  'use strict';

  angular.module('ShoppingListCheckOff',[])

  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy=this;
    toBuy.items=ShoppingListCheckOffService.getToBuyItems();


    toBuy.checkOff = function(itemIndex){
      console.log("index:"+itemIndex);
      try{

        ShoppingListCheckOffService.buy(itemIndex);
      }catch(error){
        console.log("error:"+error);
      }
    };

    toBuy.isEmpty = function (){
      return ShoppingListCheckOffService.getToBuyItems().length==0;
    }


  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();

    alreadyBought.isEmpty = function (){
      return ShoppingListCheckOffService.getBoughtItems().length==0;
    }

  };


  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems=[
      {name:"cookies", quantity:10},
      {name:"chips", quantity:5},
      {name:"soda", quantity:3},
      {name:"pie", quantity:1},
      {name:"cupcakes", quantity:12}
    ];

    var boughtItems=[];

    service.buy = function (itemIndex){
      if(itemIndex<0 || itemIndex>toBuyItems.length){
        throw new Error("IndexOutofBoundsException");
      }else{
        boughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex,1);

      }



    };


    service.getItems = function () {
      return toBuyItems;
    };

    service.getToBuyItems = function(){
      return toBuyItems;
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };


  }







})();
