$(function(){;
});
$(window).on('load', function(){
  loadjs();
});

function loadjs(){
  // チェックボックス全てを取得
  var chk = document.querySelectorAll("input[type='checkbox']");
  
  
  //select要素の取得
  var select = document.querySelector("#selectfact");
  //option要素の取得（配列）
  var options = document.querySelectorAll("#selectfact option");
  
  // ラジオボタン
  var sei_radio = document.getElementsByName("tab-head");
  
   // ラジオボタン
  var ped_radio = document.getElementsByName("tab");
  
  // 詳細リンク
  //var dtl_link = document.getElementsByClassName("clickable-row");

 
  // selectboxを選択した際のイベント取得
  
  select.addEventListener('change', (event) => {
      let sei = 0;
      let ped = 0;
  	  for (let i = 0; i < sei_radio.length; i++) {
  		if (sei_radio[i].id == "1" && sei_radio[i].checked ) {
  			sei = 1;
  		}
  	  }
  	  for (let i = 0; i < ped_radio.length; i++) {
  		if ( ped_radio[i].checked ) {
  			ped =  i;
  		}
  	  }
  	  dispHorse(chk , sei, ped, select);
  	  lisnerLink();
  });
  
  // 全てチェックボックスを選択した際のイベント取得
  for (let i = 0; i < chk.length; i++) {

    chk[i].addEventListener('change', (event) => {
      let sei = 0;
      let ped = 0;
    
  	  for (let i = 0; i < sei_radio.length; i++) {
  		if (sei_radio[i].id == "1" && sei_radio[i].checked ) {
  			sei = 1;
  		}
  	  }
  	  for (let i = 0; i < ped_radio.length; i++) {
  		if ( ped_radio[i].checked ) {
  			ped =  i;
  		}
  	  }
  	  dispHorse(chk , sei, ped, select);
  	  lisnerLink();
      });
  }
  
  // 全てチェックボックスを選択した際のイベント取得
  for (let i = 0; i < sei_radio.length; i++) {
  
  	sei_radio[i].addEventListener('change', (event) => {
  		let sei = 0;
      	
  		for (let i = 0; i < sei_radio.length; i++) {
  			if (sei_radio[i].id == "1" && sei_radio[i].checked ) {
  				sei = 1;
  			}
  		}
  		for (let i = 0; i < ped_radio.length; i++) {
  			if ( ped_radio[i].checked ) {
  				ped =  i;
  			}
  		}
  		dispHorse(chk , sei, ped, select);
  		lisnerLink();
  	
  	});
  }
  lisnerLink(); 
}

function loadjsDetail(){
  
  // ラジオボタン
  var sei_radio = document.getElementsByName("tab-head");
  
  
  // 全てチェックボックスを選択した際のイベント取得
  for (let i = 0; i < sei_radio.length; i++) {
  
  	sei_radio[i].addEventListener('change', (event) => {
  		let hibon = 0;
  		
  		for (let i = 0; i < sei_radio.length; i++) {
  			if (sei_radio[i].id == "1" && sei_radio[i].checked ) {
  				hibon = 1;
  			}
  		}
  		sessionStorage.setItem('disp_hibon' ,hibon);
  		dispHibon(hibon);
  		lisnerLink();
  	
  	});
  }
  
}

function lisnerLink() {
	  $('tr[data-href]').addClass('clickable')
  .click(function (e) { 
    if (!$(e.target).is('a')) {
    	var nextPage = $(e.target).closest('tr').data('href');
    	changeContents(nextPage);
     	 window.history.pushState(null, null, nextPage);
    };
   });
   
    $('td[data-href]').addClass('clickable')
  .click(function (e) { 
    if (!$(e.target).is('a')) {
    	var nextPage = $(e.target).closest('td').data('href');
    	changeContents(nextPage);
      window.history.pushState(null, null, nextPage);
    };
   });
   
   
}

  //戻る・進むボタンを押したとき
	onpopstate = function(event) {
		changeContents(location.pathname);
	}
	//コンテンツの切り替え
	function changeContents(url) {
		
		if ( url.match(/index/))   {
			backShow();
			loadSession();
			loadjs();
		} 
		
		if ( url.match(/detail/))   {
			var urls =  url.split('=');	
			detailShow(urls[1]);
			loadSessionDetail(urls[1]);
			loadjsDetail();
			lisnerLink();
		} 
		
	}
	
function loadSessionDetail(horse_id) {
	var houseIdList = horse_id.split(',');

	var disp_hibon =  sessionStorage.getItem('disp_hibon');
	// ラジオボタン
  	var sei_radio = document.getElementsByName("tab-head");
  	
  	if (disp_hibon == "1" && houseIdList[2] == 'P') {
     	sei_radio[1].checked = true;
     }
}

	
function loadSession() {
	 // 状態保存 コンテンツ、ラジオ、チェック
	 var chk_idx;
	 
	 chk_idx  = sessionStorage.getItem('chk_idx');
	 var chk_idx_ary = [];
     if (chk_idx != null) {
     	chk_idx_ary =  chk_idx.split(',');	
     } else {
     	// nullは初回なのでデフォルト設定
     	$("#hosi-5").prop('checked',true);
     }
     
     
     var ped  = sessionStorage.getItem('ped');
     var sei  = sessionStorage.getItem('sei');
     var factor_idx = sessionStorage.getItem('factor_idx');
     if (factor_idx == null) {
     	factor_idx = 0;
     }
     // チェックボックス
     var chk = document.querySelectorAll("input[type='checkbox']");
     
 	 // ラジオボタン
 	 var sei_radio = document.getElementsByName("tab-head");
	 // ラジオボタン
	 var ped_radio = document.getElementsByName("tab");
	 
	 var select = document.querySelector("#selectfact");
     
      
     // チェックボックス復元
     for (let i = 0; i < chk_idx_ary.length; i++) {
     	if (chk_idx_ary[i] != "") {
     		chk[chk_idx_ary[i]].checked = true;
      	} 
     }
     
     // ラジオ復元
     if (sei == "1" ) {
     	sei_radio[1].checked = true;
     }
     if (ped != null) {
  		ped_radio[ped].checked = true;
  	}
  	
  	// select 復元
  	select.options[factor_idx].selected = true;
  	
  	// 非凡リセット
  	sessionStorage.setItem('disp_hibon' ,0);
  	
}

 //フロントに表示する関数
function dispHorse(chk, sei, ped, factor) {
  var t_arr = [];
  var tht_arr = [];
  var ht_arr = [];
  var hht_arr = [];
  var ashi_arr = [];
  var hosi_arr = [];
  var chk_idx = [];
  var hibon_arr = [];
  for (let i = 0; i < chk.length; i++) {
    if (chk[i].checked) {
          // チェックされている値を取得
          //t_arr.push(chk[i].value);
          var tst = chk[i].id;
          var test = chk[i].id.match(/^t_*/);
          
          if ( chk[i].id.match(/^t\-/) != null) {
          	t_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^tht\-/) != null) {
         	tht_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^ht\-/) != null) {
         	ht_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^hht\-/) != null) {
          	hht_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^ashi\-/) != null) {
          	ashi_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^hosi\-/) != null) {
          	hosi_arr.push(chk[i].value);
          }
          if ( chk[i].id.match(/^hibon/) != null) {
          	hibon_arr.push(1)
          }
          chk_idx.push(i);
       }
     }
     
     // 条件保存 牡馬牝馬
     sessionStorage.setItem('sei' ,sei);
     
     // 条件保存 血統種別
     sessionStorage.setItem('ped' ,ped);
     
     // 条件保存 チェックボックス
     sessionStorage.setItem('chk_idx' ,chk_idx.join(','));
     
    // 条件保存 因子
     sessionStorage.setItem('factor_idx', factor.selectedIndex);
     
     // 絞り込み実施
     filterHorse(t_arr, tht_arr, ht_arr, hht_arr,ashi_arr, hosi_arr, sei, hibon_arr,factor.value);
}
