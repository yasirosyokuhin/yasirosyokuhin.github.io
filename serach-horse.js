var getHorselist = document.getElementById('getHorselist');
var horselist = document.getElementById('horselist');
var header = document.getElementById('header');
var footer = document.getElementById('footer');

var detailHorse = '';
var factorlist = '';
var telentlist = '';

initShow();

function detailShow(horse_id) {

	var houseIdList = horse_id.split(',');
	
	if(factorlist == '') {
		var sql_base = 'SELECT * FROM ? h order by id';
		factorlist = alasql(sql_base, [factor]);
	}
	if(telentlist == '') {
		var sql_base = 'SELECT * FROM ? h order by id';
		telentlist = alasql(sql_base, [telent]);
	}
	
	var sql_base = 'SELECT * FROM ? h  where id = ?';
	var dHorseResult = alasql(sql_base, [horse, Number(houseIdList[0])]);
	detailHorse =dHorseResult[0];
	
	header.innerHTML = getHeaderDetail() + getContentsDetailNavi(houseIdList)+ getContentsDetailHeader();
	
	var disp_hibon =  sessionStorage.getItem('disp_hibon');
	if (houseIdList[2] == 'P' &&  disp_hibon == 1) {
		horselist.innerHTML =  getContentsDetailHibon();
	} else {
		horselist.innerHTML =  getContentsDetail();
	}
	
	
	footer.innerHTML = "";
}



function getHeaderDetail() {
	var tag = '<div class="horsedata2"><table width="100%"><tbody><tr><th class="fixed01" width="10%">';
	if (detailHorse.ultimate_kbn == 1) {
		tag += '究極';
	} else {
		tag += detailHorse.hosi;
	}
	
	tag += '</th><td width="60%"><label>';
	tag += detailHorse.name;
	
	tag += '<div class="factor_02_img" >';
	tag += getSelfFactorImg(detailHorse.factor, detailHorse.name);
	tag += factorlist[detailHorse.t -1].c_ped
	tag += '</div></label></td>';
	tag += '</td>';
	
	tag += '<th class="fixed01" width="10%">非凡</th><td>';
	if (detailHorse.hibon_id != 0) {
		tag += telentlist[detailHorse.hibon_id -1].name;
	} else {
		tag += 'なし'
	}
	tag += '</td></tr></tbody></table>';
	
	tag += '</tbody></table><table width="100%"><tbody><tr>';
	tag += '<th class="fixed01">';
	tag += '脚質</th><th class="fixed01">成長</th>	<th class="fixed01">実</th><th class="fixed01">気</th><th class="fixed01">安</th>';
	tag += '<th class="fixed01">底</th><th class="fixed01">体</th><th class="fixed01">ダ</th><th class="fixed01">距離</th><th class="fixed01">面白</th><th class="fixed01">見事</th></tr><tr><td>';
	tag += detailHorse.ashi;
	tag += '</td><td>';
	tag += detailHorse.grow;
	tag += '</td><td>';
	tag += detailHorse.perform;
	tag += '</td><td>';
	tag += detailHorse.temper;
	tag += '</td><td>';
	tag += detailHorse.stab;
	tag += '</td><td>';
	tag += detailHorse.poten;
	tag += '</td><td>';
	tag += detailHorse.body;
	tag += '</td><td>';
	tag += detailHorse.dart;
	tag += '</td><td>';
	tag += '<p>';
	tag += detailHorse.kyori_min;
	tag += '～';
	tag += '</p><p>';
	tag += detailHorse.kyori_max;
	tag += '</p></td><td>';
	tag += detailHorse.ped + ' ';
	tag += detailHorse.tht_ped + ' ';
	tag += detailHorse.ht_ped + ' ';
	tag += detailHorse.hht_ped + ' ';
	tag += '</td><td>';
	tag += detailHorse.ttht_ped + ' ';
	tag += detailHorse.thht_ped + ' ';
	tag += detailHorse.htht_ped + ' ';
	tag += detailHorse.hhht_ped + ' ';
	tag += '</td></tr></tbody></table></div>';
	
	return tag;
}


function getSelfFactorImg(factor, name) {
	var tag = '';
	var cnt = 0;
	
	if ( name.match(/極走/)) {
		tag +=  '<img src="static/img/rfactor_02.png" alt="">';
		tag +=  '<img src="static/img/rfactor_02.png" alt="">';
		tag +='&nbsp';
		return tag;
	
	}
	var result = factor.split('-');
	
	// 元データがずれているので、補正
	if (result.length ==2 && result[0] == 'sp') {
		var wk = result[0];
		result[0] = result[1];
		result[1] = wk;
	}
	
	while (result.length > cnt) {
		if (result[cnt] == 'temper') {
			tag +=  '<img src="static/img/rfactor_10.png" alt="">';
		}
		else if (result[cnt] == 'joubu') {
			tag +=  '<img src="static/img/rfactor_06.png" alt="">';
		}
		else if (result[cnt] == 'st') {
			tag +=  '<img src="static/img/rfactor_03.png" alt="">';
		}
		else if (result[cnt] == 'dart') {
			tag +=  '<img src="static/img/rfactor_05.png" alt="">';
		}
		else if (result[cnt] == 'soujuku') {
			tag +=  '<img src="static/img/rfactor_07.png" alt="">';
		}
		else if (result[cnt] == 'bansei') {
			tag +=  '<img src="static/img/rfactor_08.png" alt="">';
		}
		else if (result[cnt] == 'ken') {
			tag +=  '<img src="static/img/rfactor_09.png" alt="">';
		}
		else if (result[cnt] == 'stp') {
			tag +=  '<img src="static/img/rfactor_04.png" alt="">';
		}
		else if (result[cnt] == 'spp') {
			tag +=  '<img src="static/img/rfactor_01.png" alt="">';
		}
		else if (result[cnt] == 'sp') {
			tag +=  '<img src="static/img/rfactor_02.png" alt="">';	
		}
		cnt++;
	}
	tag +='&nbsp';
	return tag;
}


function getFactorImg(id) {
	var tag = '';
	var cnt = 0;
	if (factorlist[id].temper == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_10.png" alt=""></td>';
		cnt++;;
	}
	
	if (factorlist[id].joubu == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_06.png" alt=""></td>';
		cnt++;
	}
	
	if (factorlist[id].st == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_03.png" alt=""></td>';
		cnt++;
	}
	if (factorlist[id].dart == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_05.png" alt=""></td>';
		cnt++;
	}
	
	if (factorlist[id].soujuku == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_07.png" alt=""></td>';
		cnt++;
	}

	
	if (factorlist[id].bansei == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_08.png" alt=""></td>';
		cnt++;
	}
	if (factorlist[id].ken == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_09.png" alt=""></td>';
		cnt++;
	}
	if (factorlist[id].stp == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_04.png" alt=""></td>';
		cnt++;
	}
	
	
	if (factorlist[id].spp == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_01.png" alt=""></td>';
		cnt++;
	}
	
	if (factorlist[id].sp == 1) {
		tag +=  '<td class="factor" width="64"><img src="static/img/rfactor_02.png" alt=""></td>';
		cnt++;
	}
	
	if (cnt == 1) {
		tag =   '<td class="factor" width="64"></td>' + tag;
	} else if (cnt == 0) {
		tag = '<td class="factor" width="64"></td><td class="factor" width="64"></td>';
	}
	return tag;
}


function getContentsDetailNavi(houseIdList) {
	let tag = '<div class="title_panel"><table width="100%"><tbody><tr>';
	var horse_idx  = sessionStorage.getItem('horse_idx_arr');
	var horse_idx_arr  = horse_idx.split(',');
	var idxBefore = '';
	var idxNext = '';
	var idx = Number(houseIdList[1]);
	
	if (idx != 0) { 
		idxBefore = horse_idx_arr[idx -1];
	}
	
	if (horse_idx_arr.length > idx +1) { 
		idxNext = horse_idx_arr[idx + 1];
	}
	
	if (idxBefore.match (/[0-9]{1,}/)) { //Pはページ送りの場合は、非凡表示を維持するための設定
		tag += '<td width="25%" class="align_left" "clickable-row" data-href="detail.htm?horse=' + idxBefore + ',' +  (idx -1) +  ',P'+ '">&lt;&lt;前</td>';
		//tag += '<td width="25%"><img src="static/btn01-10.png" alt=""></td>';
	} else {
		tag += '<td width="25%" class="align_lef"></td>';
	}
	//tag += '<td class="align_center" "clickable-row" data-href="index.html">一覧に戻る</td>';
	tag += '<td class="align_center" "clickable-row" data-href="index.html">一覧に戻る</td>';
	//tag += '<td class="align_center"><img src="static/btn01-11.png" alt=""></td>';
	
	if (idxNext.match (/[0-9]{1,}/)) {
		tag += '<td width="25%" class="align_right" "clickable-row" data-href="detail.htm?horse=' + idxNext +','+  (idx +1)   +',P' + '">次&gt;&gt;</td>';
		//tag += '<td width="25%" class="align_right"><img src="static/btn01-12.png" alt=""></td>';
	} else {
		tag += '<td width="25%" class="align_right"></td>';
		
	}
	tag += '</tr></tbody></table></div>';
	return tag;
}


function getContentsDetailHeader() {
	let tag = '<div class="content2"><div class="tabmenu-head"><div class="footer"><label><input name="tab-head" id="0" type="radio" checked="" class="hibon"><em>血統</em></label><label><input name="tab-head" id="1" type="radio" class="hibon"><em>非凡</em></label></div></div>';
	return tag;
}

function dispHibon(hibon) {
	
	if (hibon == 1) {
		horselist.innerHTML =  getContentsDetailHibon();
	} else {
		horselist.innerHTML =  getContentsDetail();
	}
}

function getContentsDetailHibon() {
	var tag = '<div class="content"><div class="hiboninfo">';	
	if (detailHorse.hibon_id == 0) {
		// 非凡なし
		tag += '<h2>非凡なし</h2><div class="spaceInfo"></div>';	
		tag += '</div></div>';	
		return tag;
	}
	
	
	tag += '<h2>非凡1</h2>';
	tag += '<h3>発揮効果</h3>';
	
	var result =telentlist[detailHorse.hibon_id -1].effect1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
		
			var lines = result[cnt].split(' ');
			var line = '';
			let lcnt = 0;
			if (lines.length > 1 ) {
				while (lines.length > lcnt) {
					line += lines[lcnt];
					if (lcnt == 0) {
						line += '<br>';
					} 
					lcnt++;
				}
			} else {
				line = result[cnt];
			}
			tag += '<li>' + line + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮条件</h3>';
	result =telentlist[detailHorse.hibon_id -1].cond1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
		
	}
	tag += '<h3>発揮対象</h3>';
	result =telentlist[detailHorse.hibon_id -1].target1.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}
	
	tag += '<h3>発揮確率</h3>';
	tag += '<div class="prob">' + telentlist[detailHorse.hibon_id -1].prob1 + '</div>';
	
	
	if (telentlist[detailHorse.hibon_id -1].effect2 == '') {
		tag += '</div></div>';
		return tag;
	}
	
	
	tag += '<h2>非凡2</h2>';
	tag += '<h3>発揮効果</h3>';
	
	var result =telentlist[detailHorse.hibon_id -1].effect2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
		
			var lines = result[cnt].split(' ');
			var line = '';
			let lcnt = 0;
			if (lines.length > 1 ) {
				while (lines.length > lcnt) {
					line += lines[lcnt];
					if (lcnt == 0) {
						line += '<br>';
					} 
					lcnt++;
				}
			} else {
				line = result[cnt];
			}
			tag += '<li>' + line + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮条件</h3>';
	result =telentlist[detailHorse.hibon_id -1].cond2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
		
	}
	tag += '<h3>発揮対象</h3>';
	result =telentlist[detailHorse.hibon_id -1].target2.split(',');
	if (result.length == 1)  {
		tag += '<ul><li>';
		tag += result[0];
		tag += '</li></ul>';
	} else {
		let cnt = 0;
		tag += '<ul>';
		while (result.length > cnt) {
			tag += '<li>' + result[cnt] + '</li>';
			cnt++;
		}
		tag += '</ul>';
	}

	tag += '<h3>発揮確率</h3>';
	tag += '<div class="prob">' + telentlist[detailHorse.hibon_id -1].prob2 + '</div>';
	tag += '</div></div>';
	
	return tag;
}


function getContentsDetail() {
	
	var tag = '<div class="content"><table class="pedigree" width="100%">';
	tag += '<tbody>';
	tag += '<tr>';
	tag += '<td align="center" class="father" rowspan="8" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="4">';
	tag += factorlist[detailHorse.t -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.t -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="4" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.tt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.tt -1)	;
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.ttt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.ttt -1)	;
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.tttt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.tttt -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.ttht -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.ttht -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.tht -1].name;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thtt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.thtt -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thht -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.thht -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="7">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="4">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.ht -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.ht -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.htt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.htt -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.httt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.httt -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.htht -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.htht -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.hht -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.hht -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhtt -1].name;
	tag += '</td>';
	tag += getFactorImg(detailHorse.hhtt -1);
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhht -1].name;;
	tag += '</td>';
	tag += getFactorImg(detailHorse.hhht -1);
	tag += '</tr>';
	tag += '</tbody>';
	tag += '</table>';
// 親血統
	tag += '<h3>親血統</h3>';
	tag += '<table class="pedigree" width="100%">';
	tag += '<tbody>';
	tag += '<tr>';
	tag += '<td align="center" class="father" rowspan="8" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="4">';
	tag += factorlist[detailHorse.t -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="4" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.tt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.ttt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.tttt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.ttht -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.tht -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thtt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thht -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="7">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="4">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.ht -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.htt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.httt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.htht -1].p_ped;
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.hht -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhtt -1].p_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhht -1].p_ped;;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '</tbody>';
	tag += '</table>';

// 子血統
	tag += '<h3>子血統</h3>';
	tag += '<table class="pedigree" width="100%">';
	tag += '<tbody>';
	tag += '<tr>';
	tag += '<td align="center" class="father" rowspan="8" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="4">';
	tag += factorlist[detailHorse.t -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="4" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.tt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2" width="30">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.ttt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" width="30">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.tttt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.ttht -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.tht -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thtt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.thht -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="7">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="4">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="3">';
	tag += factorlist[detailHorse.ht -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.htt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.httt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.htht -1].c_ped;
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother" rowspan="3">';
	tag += '母</td>';
	tag += '<td class="father" rowspan="2">';
	tag += '父</td>';
	tag += '<td class="horse" colspan="2">';
	tag += factorlist[detailHorse.hht -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhtt -1].c_ped;
	tag += '</td><td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '<img src="" alt="">';
	tag += '</td>';
	tag += '</tr>';
	tag += '<tr>';
	tag += '<td class="mother">';
	tag += '母</td>';
	tag += '<td class="father">';
	tag += '父</td>';
	tag += '<td class="horse">';
	tag += factorlist[detailHorse.hhht -1].c_ped;;
	tag += '</td><td class="factor" width="50">';
	tag += '</td>';
	tag += '<td class="factor" width="50">';
	tag += '</td>';
	tag += '</tr>';
	tag += '</tbody>';
	tag += '</table>';
return tag;

}


function backShow() {
	header.innerHTML = sessionStorage.getItem('header');
	horselist.innerHTML = sessionStorage.getItem('contents');
	footer.innerHTML =  sessionStorage.getItem('footer');

}

function initShow() {
	var sql_base = 'SELECT * FROM ? h  where sei = 0 and hosi =  5 order by hosi desc ,name';
	var j_horselist = alasql(sql_base, [horse]);
	header.innerHTML = getHeader();
	horselist.innerHTML = formatHorse(j_horselist);
	footer.innerHTML = getFooter();
	$("#hosi-5").prop('checked',true);
}

function getFactorList() {
	
	var sql_base = 'select id,name from (SELECT id,  "速:"+ name as name FROM ? h  where sp = 1 union all SELECT "none" as id, "速:"+  name as name FROM ? h  where factor in("sp","sp-dart","sp-joubu","sp-ken","sp-stp","sp-temper","spp-sp","st-sp") ) order by name ';
	var j_horselist_sp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"短:" + name as name FROM ? h  where spp = 1 union all SELECT "none" as id,"短:" + name as name FROM ? h  where factor in("spp","spp-dart","spp-soujuku","spp-sp","st-spp")) order by name';
	var j_horselist_spp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"長:" + name as name FROM ? h  where stp = 1 union all SELECT "none" as id,"長:" + name as name FROM ? h  where factor in("bansei-stp","ken-stp","sp-stp","stp","stp-dart","stp-joubu","temper-stp")) order by name';
	var j_horselist_stp = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"底:" + name as name FROM ? h  where st = 1 union all SELECT "none" as id,"底:" + name as name FROM ? h  where factor in("bansei-st","st","st-soujuku","st","st-sp","st-soujuku","st-stp","st-temper"))order by name';
	var j_horselist_st = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id ,name from(SELECT id,"堅:" + name as name FROM ? h  where ken = 1 union all SELECT "none" as id,"堅:" + name as name FROM ? h  where factor in("sp-ken","ken-stp") )order by name';
	var j_horselist_ken = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id,name from(SELECT id,"ダ:" + name as name FROM ? h  where dart = 1 union all SELECT "none" as id,"ダ:" + name as name FROM ? h  where factor in("sp-dart","spp-dart","stp-dart"))order by name';
	var j_horselist_dart = alasql(sql_base, [factor, horse]);
	
	sql_base = 'select id,name from(SELECT id,"丈:" + name as name FROM ? h  where joubu = 1 union all SELECT "none" as id,"丈:" + name as name FROM ? h  where factor in("joubu","stp-joubut","sp-joubu"))order by name';
	var j_horselist_joubu = alasql(sql_base, [factor, horse]);
	
	var tag = '';
	tag += '<div class="tabmenu3">';
    tag += '<label><span>';
	tag += '<div class="cp_ipselect cp_sl04">';
	tag += '<select id="selectfact" style="text-align:-webkit-center;">';
	tag += '<option value="" >因子検索</option>';
	tag += formatFatorList(j_horselist_sp);
	tag += formatFatorList(j_horselist_spp);
	tag += formatFatorList(j_horselist_stp);
	tag += formatFatorList(j_horselist_st);
	tag += formatFatorList(j_horselist_ken);
	tag += formatFatorList(j_horselist_dart);
	tag += formatFatorList(j_horselist_joubu);
	tag += '</select><span class="resetimg"><img src="static/img/reset.png" alt=""  onclick="window.location.reload();"></div>';
	tag += '</div></div>';
	tag += '</div>';
    tag += '</span></label>';
    tag += '</div><div class="footertxt">';
    tag += '<a class="tw_share" href="http://twitter.com/share?url=https://yasirosyokuhin.github.io/index.html&text=ダビマス検索ツール&hashtags=ダビマス検索ツール" target="_blank">共有</a>';
	tag += 'ダビマス検索ツール<a href="https://twitter.com/papayuki2016">@ふじろん牧場</a></div>';
	
	return tag
}


function filterHorse(t_arr,tht_arr,ht_arr,hht_arr, ashi_arr, hosi_arr, sei, hibon_arr,factor) {
	var sql  ='';
	var sql_base  = 'SELECT * FROM ? h';
	var sql_order = ' order by hosi desc ,name';
	const sql_where = ' where ';
	var sql_filter = '';
	
	sql_filter = filterSql('ped', t_arr, sql_filter, 1);
	sql_filter = filterSql('tht_ped', tht_arr, sql_filter, 1);
	sql_filter = filterSql('ht_ped', ht_arr, sql_filter, 1);
	sql_filter = filterSql('hht_ped', hht_arr, sql_filter, 1);
	sql_filter = filterSql('hht_ped', hht_arr, sql_filter, 1);
	
	if (sei == 0) {
		sql_filter = filterSql('ashi', ashi_arr, sql_filter, 1);
		if (hibon_arr.length > 0) {
			if (sql_filter.length > 0 ) {
				sql_filter += ' AND ';
			}
			sql_filter += ' hibon_id <> 0';
		}
	}
	sql_filter = filterSql('hosi', hosi_arr, sql_filter, 0);
	sql_filter = filterSqlFactor(sql_filter, factor);
	
	sql += sql_base;
	sql += sql_where;
	sql += 'sei = ' + sei ;
	
	if (sql_filter.length > 0) {	
		sql += ' AND ';
		sql += sql_filter;
	} 
	if (factor.length == 0) {
		sql += sql_order;	
	} else {
		sql += sqlOrderFactor(factor);	
	
	}
	var j_horselist = alasql(sql, [horse]);
	var contents  = formatHorse(j_horselist);
	horselist.innerHTML = contents;
}

function filterSqlFactor(sql_filter, factor_id) {
	if (factor_id.length == 0) {
		return sql_filter;
	}
	
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	// factorが名前の場合は、自身の因子持ちのみ
	var horse_name ='';
	if (factor_id.match(/[0-9]{1,}/)) {
		var sql_base = 'SELECT name  FROM ? h  where id = ?';
		horse_name = alasql(sql_base, [factor, Number(factor_id)]);
		sql_filter += ' (';
		sql_filter += 'name = "' + horse_name[0].name + '" OR ';
		sql_filter += 'name LIKE \'' + horse_name[0].name + '-%\' OR ';//因名
		sql_filter += 'name LIKE \'' + horse_name[0].name + '1___%\' OR ';//年号
		sql_filter += 'name LIKE \'' + horse_name[0].name + '2___%\' OR ';//年号
		sql_filter += 't=' +  factor_id + ' OR ';
		sql_filter += 'tt=' +  factor_id + ' OR ';
		sql_filter += 'ttht=' +  factor_id + ' OR ';
		sql_filter += 'ttt=' +  factor_id + ' OR ';
		sql_filter += 'tttt=' +  factor_id + ' OR ';
		sql_filter += 'thtt=' +  factor_id + ' OR ';
		sql_filter += 'tht=' +  factor_id + ' OR ';
		sql_filter += 'thht=' +  factor_id + ' OR ';
		sql_filter += 'ht=' +  factor_id + ' OR ';
		sql_filter += 'htt=' +  factor_id + ' OR ';
		sql_filter += 'httt=' +  factor_id + ' OR ';
		sql_filter += 'htht=' +  factor_id + ' OR ';
		sql_filter += 'hhtt=' +  factor_id + ' OR ';
		sql_filter += 'hht=' +  factor_id + ' OR ';
		sql_filter += 'hhht=' +  factor_id + '';
		sql_filter += ' )';
	} else {
		horse_name = factor_id;
		sql_filter += ' (';
		sql_filter += 'name = "' + horse_name + '" OR ';
		sql_filter += 'name LIKE \'' + horse_name + '-%\' OR ';//因名
		sql_filter += 'name LIKE \'' + horse_name + '1___%\' OR ';//年号
		sql_filter += 'name LIKE \'' + horse_name + '2___%\'  ';//年号
		sql_filter += ' )';
	} 
	return sql_filter;
}

function sqlOrderFactor( factor_id) {
	var sql = '';
	sql += ' order by  ';
	var horse_name ='';
	
	if (factor_id.match(/[0-9]{1,}/)) {
		var sql_base = 'SELECT name  FROM ? h  where id = ?';
		horse_name = alasql(sql_base, [factor, Number(factor_id)]);
		sql += 'name = "' + horse_name[0].name + '" desc , ';
		sql += 'name LIKE \'' + horse_name[0].name + '-%\' desc , ';//因名
		sql += 'name LIKE \'' + horse_name[0].name + '1___%\' desc , ';//年号
		sql += 'name LIKE \'' + horse_name[0].name + '2___%\' desc , ';//年号
		sql += 't=' +  factor_id + 'desc , '; //2
		sql += 'tt=' +  factor_id + 'desc , ';//3
		sql += 'ht=' +  factor_id + ' desc, ';//3
		sql += 'ttt=' +  factor_id + ' desc, ';//4
		sql += 'htt=' +  factor_id + ' desc, ';//4
		sql += 'tht=' +  factor_id + ' desc, ';//4
		sql += 'hht=' +  factor_id + ' desc, ';//4
	} else {
		horse_name = factor_id;
		sql += 'name = "' + horse_name + '" desc , ';
		sql += 'name LIKE \'' + horse_name + '-%\' desc , ';//因名
		sql += 'name LIKE \'' + horse_name + '1___%\' desc , ';//年号
		sql += 'name LIKE \'' + horse_name + '2___%\' desc , ';//年号
	}
	sql += ' hosi desc,name ';
	return sql;
}

function filterSql(col_filter,arr, sql_filter, string) { 
	let cnt = 0;
	
	if (arr.length == 0) {
		return sql_filter;
	}
	
	if (sql_filter.length > 0 ) {
		sql_filter += ' AND ';
	}
	
	sql_filter += col_filter;
	sql_filter += ' in (';
	
	while (arr.length > cnt) {
		var value = arr[cnt];
		
		if (string == 1 ) {
			sql_filter+= '"' + value + '"';
		} else {
			sql_filter+=  value;
		}
				
		if(arr.length != cnt + 1) {
			sql_filter+= ',';
		}
		cnt++;
	}
	
	sql_filter += ')';
	return sql_filter;
}


function formatHorse(j_horselist) {
	//html整形
	var horse_idx_arr = [];
	let cnt = 0;
	let tag = '';
	tag += '<nav><div class="horsedata">';
	tag += '<table width="100%"><tr><th class="fixed01">レア</th><th class="fixed01">名前</th><th class="fixed01">&nbsp実&nbsp</th><th class="fixed01">&nbsp気&nbsp</th><th class="fixed01">&nbsp安&nbsp</th><th class="fixed01">距離</th><th class="fixed01">面白/見事</th></tr>';
	while (j_horselist.length > cnt) {
		var j_horse = j_horselist[cnt];	 

		tag += '<tr name="clickable-row" data-href="detail.html?horse=' + j_horse.id + ',' + cnt  + '">';
		horse_idx_arr.push(j_horse.id);
		
		
		tag += ' <td>' + j_horse.hosi + '</td>';
		if (j_horse.name.length > 15) {
			tag += '    <td style="font-size: 9pt;"><label>' + j_horse.name+ '<label/>';
		} else {
			tag += '    <td><label>' + j_horse.name+ '<label/>';
		}
		tag += '    <p>' + j_horse.ashi + '　'+ j_horse.grow　+ '　 ' + j_horse.dart +  '</p>';
		tag += '    </td>';
		tag += '    <td>' + j_horse.perform + '</td>';
		tag += '    <td>' + j_horse.temper + '</td>';
		tag += '    <td>' + j_horse.stab + '</td>';
		tag += '    <td ><p>' + j_horse.kyori_min + '～</p>';
		tag += '    <p>' + j_horse.kyori_max + '</p>';
		tag += '   <td>';
		tag += j_horse.ped + ' ';
		tag += j_horse.tht_ped + ' ';
		tag += j_horse.ht_ped + ' ';
		tag += j_horse.hht_ped + '<br>';
		tag += j_horse.ttht_ped + ' ';
		tag += j_horse.thht_ped + ' ';
		tag += j_horse.htht_ped + ' ';
		tag += j_horse.hhht_ped + ' ';
		tag += '   </td>';
		tag += '</tr>';
		cnt++;
	}
	tag += '</div></nav>';
	// 表示状態を維持
	sessionStorage.setItem('contents', tag);
	// 条件保存 チェックボックス
    sessionStorage.setItem('horse_idx_arr' ,horse_idx_arr.join(','));
	return tag;
}

function formatFatorList(j_horselist) {
	let cnt = 0;
	let tag = '';
	var b_name = '';
	while (j_horselist.length > cnt) {
		var j_horse = j_horselist[cnt];	
		
		var name = j_horse.name.replace(/[0-9]{1,}/g, '');
		name = name.replace(/-.*-/g, '');
		if (name != b_name) {
			b_name = name;
			
			if (j_horse.id == "none") {
				var origin_name = name.replace(/.*:/g, '');
				var sql_base = 'SELECT id  FROM ? h  where name = ?';
				var horse_id = alasql(sql_base, [factor, origin_name]);
				
				var id = ''
				if (horse_id.length  > 0) {
					id = horse_id[0].id;
				} else {
					id = origin_name;
				}
				tag += '<option value="' + id  + '">' + name + '</option>';
			} else {
				tag += '<option value="' + j_horse.id  + '">' + name + '</option>';
			}
		}
		cnt++;
	}
	return tag;
}


function getHeader() {
	let tag = '<div class="tabmenu-head"><div class="footer"><label><input name="tab-head" id="0" type="radio" checked="" class="sei"><em>種牡馬</em></label><label><input name="tab-head" id="1" type="radio" class="sei"><em>牝馬</em></label></div></div>';
	sessionStorage.setItem('header', tag);	
	return tag;
}

function getFooter() {
	let tag = '<div class="tabmenu">';
	// 親血統
	tag += '<label><input name="tab" type="radio" id="0" checked="" ><em>父</em><span><div class="btn2_wrap"><input value="Ro" id="t-Ro" type="checkbox"><label for="t-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="t-Ne" type="checkbox"><label for="t-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="t-Ns" type="checkbox"><label for="t-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="t-Na" type="checkbox"><label for="t-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="t-Ha" type="checkbox"><label for="t-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="t-St" type="checkbox"><label for="t-St">St</label></div><div class="btn2_wrap"><input value="He" id="t-He" type="checkbox"><label for="t-He">He</label></div><div class="btn2_wrap"><input value="Te" id="t-Te" type="checkbox"><label for="t-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="t-Ph" type="checkbox"><label for="t-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="t-Ma" type="checkbox"><label for="t-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="t-Hi" type="checkbox"><label for="t-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="t-Sw" type="checkbox"><label for="t-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="t-Fa" type="checkbox"><label for="t-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="t-To" type="checkbox"><label for="t-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="t-Ec" type="checkbox"><label for="t-Ec">Ec</label></div></span></label><label><input name="tab" type="radio" id="1"><em>父母父</em><span><div class="btn2_wrap"><input value="Ro" id="tht-Ro" type="checkbox"><label for="tht-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="tht-Ne" type="checkbox"><label for="tht-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="tht-Ns" type="checkbox"><label for="tht-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="tht-Na" type="checkbox"><label for="tht-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="tht-Ha" type="checkbox"><label for="tht-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="tht-St" type="checkbox"><label for="tht-St">St</label></div><div class="btn2_wrap"><input value="He" id="tht-He" type="checkbox"><label for="tht-He">He</label></div><div class="btn2_wrap"><input value="Te" id="tht-Te" type="checkbox"><label for="tht-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="tht-Ph" type="checkbox"><label for="tht-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="tht-Ma" type="checkbox"><label for="tht-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="tht-Hi" type="checkbox"><label for="tht-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="tht-Sw" type="checkbox"><label for="tht-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="tht-Fa" type="checkbox"><label for="tht-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="tht-To" type="checkbox"><label for="tht-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="tht-Ec" type="checkbox"><label for="tht-Ec">Ec</label></div></span></label><label><input name="tab" id="3" type="radio"><em>母父</em><span><div class="btn2_wrap"><input value="Ro" id="ht-Ro" type="checkbox"><label for="ht-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="ht-Ne" type="checkbox"><label for="ht-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="ht-Ns" type="checkbox"><label for="ht-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="ht-Na" type="checkbox"><label for="ht-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="ht-Ha" type="checkbox"><label for="ht-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="ht-St" type="checkbox"><label for="ht-St">St</label></div><div class="btn2_wrap"><input value="He" id="ht-He" type="checkbox"><label for="ht-He">He</label></div><div class="btn2_wrap"><input value="Te" id="ht-Te" type="checkbox"><label for="ht-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="ht-Ph" type="checkbox"><label for="ht-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="ht-Ma" type="checkbox"><label for="ht-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="ht-Hi" type="checkbox"><label for="ht-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="ht-Sw" type="checkbox"><label for="ht-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="ht-Fa" type="checkbox"><label for="ht-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="ht-To" type="checkbox"><label for="ht-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="ht-Ec" type="checkbox"><label for="ht-Ec">Ec</label></div></span></label><label><input name="tab" type="radio" id="4"><em>母母父</em><span><div class="btn2_wrap"><input value="Ro" id="hht-Ro" type="checkbox"><label for="hht-Ro">Ro</label></div><div class="btn2_wrap"><input value="Ne" id="hht-Ne" type="checkbox"><label for="hht-Ne">Ne</label></div><div class="btn2_wrap"><input value="Ns" id="hht-Ns" type="checkbox"><label for="hht-Ns">Ns</label></div><div class="btn2_wrap"><input value="Na" id="hht-Na" type="checkbox"><label for="hht-Na">Na</label></div><div class="btn2_wrap"><input value="Ha" id="hht-Ha" type="checkbox"><label for="hht-Ha">Ha</label></div><div class="btn2_wrap"><input value="St" id="hht-St" type="checkbox"><label for="hht-St">St</label></div><div class="btn2_wrap"><input value="He" id="hht-He" type="checkbox"><label for="hht-He">He</label></div><div class="btn2_wrap"><input value="Te" id="hht-Te" type="checkbox"><label for="hht-Te">Te</label></div><div class="btn2_wrap"><input value="Ph" id="hht-Ph" type="checkbox"><label for="hht-Ph">Ph</label></div><div class="btn2_wrap"><input value="Ma" id="hht-Ma" type="checkbox"><label for="hht-Ma">Ma</label></div><div class="btn2_wrap"><input value="Hi" id="hht-Hi" type="checkbox"><label for="hht-Hi">Hi</label></div><div class="btn2_wrap"><input value="Sw" id="hht-Sw" type="checkbox"><label for="hht-Sw">Sw</label></div><div class="btn2_wrap"><input value="Fa" id="hht-Fa" type="checkbox"><label for="hht-Fa">Fa</label></div><div class="btn2_wrap"><input value="To" id="hht-To" type="checkbox"><label for="hht-To">To</label></div><div class="btn2_wrap"><input value="Ec" id="hht-Ec" type="checkbox"><label for="hht-Ec">Ec</label></div></span></label>';	
	tag += '</div>';
	// 脚質
	tag += '<div class="tabmenu2">';
    tag += '<label><span>';
    tag += '<div class="btn3_wrap"><input value="自在" id="ashi-jizai" type="checkbox"/><label for="ashi-jizai">自</label></div>';
    tag += '<div class="btn3_wrap"><input value="逃げ" id="ashi-nige" type="checkbox"/><label for="ashi-nige">逃</label></div>';
    tag += '<div class="btn3_wrap"><input value="先行" id="ashi-senko" type="checkbox"/><label for="ashi-senko">先</label></div>';
    tag += '<div class="btn3_wrap"><input value="差し" id="ashi-sashi" type="checkbox"/><label for="ashi-sashi">差</label></div>';
    tag += '<div class="btn3_wrap"><input value="追込" id="ashi-oikomi" type="checkbox"/><label for="ashi-oikomi">追</label></div>';
    tag += '<div class="btn3_wrap"><input value="1" id="hibon" type="checkbox"/><label for="hibon">非</label></div>';
    tag += '<div class="btn3_wrap"><input value="5" id="hosi-5" type="checkbox"><label for="hosi-5">５</label></div>';
    tag += '<div class="btn3_wrap"><input value="4" id="hosi-4" type="checkbox"><label for="hosi-4">４</label></div>';
    tag += '<div class="btn3_wrap"><input value="3" id="hosi-3" type="checkbox"><label for="hosi-3">３</label></div>';
    tag += '<div class="btn3_wrap"><input value="2" id="hosi-2" type="checkbox"><label for="hosi-2">２</label></div>';
    tag += '<div class="btn3_wrap"><input value="1" id="hosi-1" type="checkbox"><label for="hosi-1">１</label></div>';
    tag += '</span></label>';
	tag += '</div>';
	tag += getFactorList();
	sessionStorage.setItem('footer', tag);
	return tag;
}
