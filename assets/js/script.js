var fessmodule = angular.module('myModule', []);

fessmodule.controller('ctrlRead', function ($scope, $filter) {

    // init
    $scope.sort = {
                sortingOrder : 'id',
                reverse : false
            };

    $scope.gap = 5;

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        {"id":1,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":2,"name":"Kate Jazz","description":"BSIT","gender":"Female","status":"Active"},
        {"id":3,"name":"Jorge Nicol","description":"BSIT","gender":"Male","status":"Active"},
        {"id":4,"name":"Elyn Love","description":"BSIT","gender":"Female","status":"Active"},
        {"id":5,"name":"Donna Mae","description":"BSIT","gender":"Female","status":"Active"},
        {"id":6,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":7,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":8,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":9,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":10,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":11,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":12,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":13,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":14,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
        {"id":15,"name":"Jefferson","description":"BSIT","gender":"Male","status":"Active"},
       

    ];

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size,start, end) {
        var ret = [];
        console.log(size,start, end);

        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
         console.log(ret);
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();



});


fessmodule.$inject = ['$scope', '$filter'];

fessmodule.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,
    scope: {
      order: '=',
      sort: '='
    },
    template :
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {

    // change sorting order
    scope.sort_by = function(newSortingOrder) {
        var sort = scope.sort;

        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }

        sort.sortingOrder = newSortingOrder;
    };


    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{
            return'icon-sort'
        }
    };
  }// end link
}
});
