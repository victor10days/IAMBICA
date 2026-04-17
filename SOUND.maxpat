{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 4,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 34.0, 95.0, 999.0, 752.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 613.953466415405273, 40.697672963142395, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 565.300814747810364, 212.067686676979065, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 478.34959352016449, 216.579882264137268, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 564.409072160720825, 151.479519248008728, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 467.409072160720825, 151.479519248008728, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-34",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 372.918966770172119, 217.439029216766357, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 285.967745542526245, 221.951224803924561, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-40",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 372.027224183082581, 156.850861787796021, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 275.027224183082581, 156.850861787796021, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-32",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Attenuator.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 2006.052630424499512, 751.535763919353485, 92.0, 116.0 ],
					"varname" : "bp.Attenuator[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-31",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Attenuator.maxpat",
					"numinlets" : 1,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1862.982456207275391, 792.035088539123535, 92.0, 116.0 ],
					"varname" : "bp.Attenuator",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "", "", "", "", "" ],
					"patching_rect" : [ 298.980003356933594, 44.738898873329163, 191.0, 22.0 ],
					"text" : "regexp /user/(d+)/mouse/([xy]) (.+)"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-74",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO3.maxpat",
					"numinlets" : 1,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1715.383703470230103, 599.0, 160.0, 116.0 ],
					"varname" : "bp.LFO3[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-73",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.LFO3.maxpat",
					"numinlets" : 1,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1712.148409128189087, 470.172414064407349, 160.0, 116.0 ],
					"varname" : "bp.LFO3",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-72",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 186.951223611831665, 217.439029216766357, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 100.000002384185791, 221.951224803924561, 37.0, 22.0 ],
					"text" : "*~ 10"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 186.059481024742126, 156.850861787796021, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 89.059481024742126, 156.850861787796021, 31.0, 22.0 ],
					"text" : "sig~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-53",
					"maxclass" : "newobj",
					"numinlets" : 7,
					"numoutlets" : 7,
					"outlettype" : [ "", "", "", "", "", "", "" ],
					"patching_rect" : [ 89.059481024742126, 89.140376448631287, 568.0, 22.0 ],
					"text" : "route /user/1/mouse/x /user/1/mouse/y /user/2/mouse/x /user/2/mouse/y /user/3/mouse/x /user/3/mouse/y"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 89.059481024742126, 44.738898873329163, 97.0, 22.0 ],
					"text" : "udpreceive 7400"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-57",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Quantizer.maxpat",
					"numinlets" : 1,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1893.030758619308472, 470.172414064407349, 217.0, 116.0 ],
					"varname" : "bp.Quantizer[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-59",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Sample and Hold.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1494.390143871307373, 470.172414064407349, 90.0, 116.0 ],
					"varname" : "bp.Sample and Hold[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-60",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Noise.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1603.792741298675537, 470.172414064407349, 95.0, 116.0 ],
					"varname" : "bp.Noise[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-56",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Pulse Designer.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1740.867659330368042, 89.140376448631287, 472.0, 226.0 ],
					"varname" : "bp.Pulse Designer[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-55",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Quantizer.maxpat",
					"numinlets" : 1,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1893.030758619308472, 599.0, 217.0, 116.0 ],
					"varname" : "bp.Quantizer",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"lastchannelcount" : 0,
					"maxclass" : "live.gain~",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "signal", "signal", "", "float", "list" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 686.999993562698364, 1509.284262537956238, 106.0, 136.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "live.gain~",
							"parameter_mmax" : 6.0,
							"parameter_mmin" : -70.0,
							"parameter_shortname" : "live.gain~",
							"parameter_type" : 0,
							"parameter_unitstyle" : 4
						}

					}
,
					"varname" : "live.gain~"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "ezdac~",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 686.999993562698364, 1672.454530954360962, 45.0, 45.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-46",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Gigaverb.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 637.599218845367432, 1211.726554155349731, 332.0, 116.0 ],
					"varname" : "bp.Gigaverb[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-45",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Gigaverb.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 1208.288903951644897, 1211.726554155349731, 332.0, 116.0 ],
					"varname" : "bp.Gigaverb[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 30.966561317443848, 1047.560050964355469, 18.0, 20.0 ],
					"text" : "R"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 30.909089803695679, 807.272698402404785, 18.0, 20.0 ],
					"text" : "L"
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-39",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1208.288903951644897, 733.076944351196289, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter[5]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-38",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1208.288903951644897, 966.503340005874634, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter[4]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-37",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 637.599218845367432, 966.503340005874634, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-35",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Stereo Mixer.maxpat",
					"numinlets" : 8,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 657.031327486038208, 1375.645761489868164, 202.0, 116.0 ],
					"varname" : "bp.Stereo Mixer",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-33",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Gigaverb.maxpat",
					"numinlets" : 2,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 63.461257696151733, 1211.726554155349731, 332.0, 116.0 ],
					"varname" : "bp.Gigaverb",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-29",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Pulse Designer.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1247.319321393966675, 83.484664678573608, 472.0, 226.0 ],
					"varname" : "bp.Pulse Designer",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-26",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Sample and Hold.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1494.390143871307373, 599.0, 90.0, 116.0 ],
					"varname" : "bp.Sample and Hold",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-25",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Noise.maxpat",
					"numinlets" : 0,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1603.792741298675537, 599.0, 95.0, 116.0 ],
					"varname" : "bp.Noise",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-22",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 63.461257696151733, 726.875020980834961, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-21",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 63.461257696151733, 966.503340005874634, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-20",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Classroom Filter.maxpat",
					"numinlets" : 4,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 637.599218845367432, 730.000020980834961, 558.0, 223.0 ],
					"varname" : "bp.Classroom Filter",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-18",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1114.66269850730896, 599.0, 113.0, 116.0 ],
					"varname" : "bp.VCA[4]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-19",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 401.2574782371521, 599.0, 113.0, 116.0 ],
					"varname" : "bp.VCA[5]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-16",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1244.093514680862427, 470.172414064407349, 234.0, 116.0 ],
					"varname" : "bp.ADSR[4]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-17",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1244.093514680862427, 599.0, 234.0, 116.0 ],
					"varname" : "bp.ADSR[5]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-15",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 534.416037797927856, 339.0, 234.0, 116.0 ],
					"varname" : "bp.ADSR[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-14",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 534.416037797927856, 470.172414064407349, 234.0, 116.0 ],
					"varname" : "bp.ADSR[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-13",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1247.319321393966675, 339.0, 234.0, 116.0 ],
					"varname" : "bp.ADSR[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-12",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.ADSR.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 530.91246509552002, 599.0, 234.0, 116.0 ],
					"varname" : "bp.ADSR",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-10",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1114.66269850730896, 470.172414064407349, 113.0, 116.0 ],
					"varname" : "bp.VCA[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-11",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 401.2574782371521, 470.172414064407349, 113.0, 116.0 ],
					"varname" : "bp.VCA[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-9",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 1114.66269850730896, 339.0, 113.0, 116.0 ],
					"varname" : "bp.VCA[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-8",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.VCA.maxpat",
					"numinlets" : 2,
					"numoutlets" : 1,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal" ],
					"patching_rect" : [ 401.2574782371521, 339.0, 113.0, 116.0 ],
					"varname" : "bp.VCA",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-6",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 788.90196681022644, 599.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[4]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-7",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 63.428583145141602, 599.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[5]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-4",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 788.90196681022644, 470.172414064407349, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[2]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-5",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 63.428583145141602, 470.172414064407349, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[3]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-3",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 788.90196681022644, 339.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator[1]",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"extract" : 1,
					"id" : "obj-2",
					"lockeddragscroll" : 0,
					"lockedsize" : 0,
					"maxclass" : "bpatcher",
					"name" : "bp.Oscillator.maxpat",
					"numinlets" : 6,
					"numoutlets" : 2,
					"offset" : [ 0.0, 0.0 ],
					"outlettype" : [ "signal", "signal" ],
					"patching_rect" : [ 63.428583145141602, 339.0, 314.0, 116.0 ],
					"varname" : "bp.Oscillator",
					"viewvisibility" : 1
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 1 ],
					"source" : [ "obj-1", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 1 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 1 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 1 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 1 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 1 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 1 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 1 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"order" : 0,
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"order" : 1,
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 2,
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"order" : 1,
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"order" : 0,
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-57", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"source" : [ "obj-32", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 1 ],
					"source" : [ "obj-33", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 1 ],
					"order" : 0,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"order" : 1,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 1 ],
					"source" : [ "obj-35", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 1 ],
					"order" : 0,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"order" : 1,
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 1 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 1 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-34", 0 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-36", 0 ],
					"source" : [ "obj-42", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 1 ],
					"order" : 0,
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"order" : 1,
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 5 ],
					"source" : [ "obj-45", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 4 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 3 ],
					"source" : [ "obj-46", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-35", 2 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 1 ],
					"order" : 0,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"order" : 1,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-43", 0 ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"source" : [ "obj-49", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 1 ],
					"source" : [ "obj-51", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-40", 0 ],
					"source" : [ "obj-53", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"source" : [ "obj-53", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"source" : [ "obj-53", 5 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-49", 0 ],
					"source" : [ "obj-53", 4 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-53", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"source" : [ "obj-53", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"order" : 0,
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"order" : 1,
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"order" : 2,
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"order" : 1,
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"order" : 0,
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"order" : 0,
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"order" : 3,
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"order" : 2,
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"order" : 1,
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-32", 0 ],
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 0 ],
					"source" : [ "obj-60", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-71", 0 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-72", 0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 1 ],
					"order" : 0,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-73", 0 ],
					"order" : 1,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 1 ],
					"order" : 0,
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"order" : 1,
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-59", 1 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 1 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-10::obj-33" : [ "Quadrants[3]", "Quadrants", 0 ],
			"obj-10::obj-55" : [ "Bypass[3]", "Bypass", 0 ],
			"obj-10::obj-80" : [ "Response[3]", "Response", 0 ],
			"obj-11::obj-33" : [ "Quadrants[2]", "Quadrants", 0 ],
			"obj-11::obj-55" : [ "Bypass[2]", "Bypass", 0 ],
			"obj-11::obj-80" : [ "Response[2]", "Response", 0 ],
			"obj-12::obj-1" : [ "Attack", "Attack", 0 ],
			"obj-12::obj-15" : [ "Legato", "Legato", 0 ],
			"obj-12::obj-20" : [ "Mute[6]", "Mute", 0 ],
			"obj-12::obj-29" : [ "Decay", "Decay", 0 ],
			"obj-12::obj-31" : [ "Release", "Release", 0 ],
			"obj-12::obj-32" : [ "Sustain", "Sustain", 0 ],
			"obj-13::obj-1" : [ "Attack[1]", "Attack", 0 ],
			"obj-13::obj-15" : [ "Legato[1]", "Legato", 0 ],
			"obj-13::obj-20" : [ "Mute[7]", "Mute", 0 ],
			"obj-13::obj-29" : [ "Decay[1]", "Decay", 0 ],
			"obj-13::obj-31" : [ "Release[1]", "Release", 0 ],
			"obj-13::obj-32" : [ "Sustain[1]", "Sustain", 0 ],
			"obj-14::obj-1" : [ "Attack[2]", "Attack", 0 ],
			"obj-14::obj-15" : [ "Legato[2]", "Legato", 0 ],
			"obj-14::obj-20" : [ "Mute[8]", "Mute", 0 ],
			"obj-14::obj-29" : [ "Decay[2]", "Decay", 0 ],
			"obj-14::obj-31" : [ "Release[2]", "Release", 0 ],
			"obj-14::obj-32" : [ "Sustain[2]", "Sustain", 0 ],
			"obj-15::obj-1" : [ "Attack[3]", "Attack", 0 ],
			"obj-15::obj-15" : [ "Legato[3]", "Legato", 0 ],
			"obj-15::obj-20" : [ "Mute[9]", "Mute", 0 ],
			"obj-15::obj-29" : [ "Decay[3]", "Decay", 0 ],
			"obj-15::obj-31" : [ "Release[3]", "Release", 0 ],
			"obj-15::obj-32" : [ "Sustain[3]", "Sustain", 0 ],
			"obj-16::obj-1" : [ "Attack[5]", "Attack", 0 ],
			"obj-16::obj-15" : [ "Legato[5]", "Legato", 0 ],
			"obj-16::obj-20" : [ "Mute[11]", "Mute", 0 ],
			"obj-16::obj-29" : [ "Decay[5]", "Decay", 0 ],
			"obj-16::obj-31" : [ "Release[5]", "Release", 0 ],
			"obj-16::obj-32" : [ "Sustain[5]", "Sustain", 0 ],
			"obj-17::obj-1" : [ "Attack[4]", "Attack", 0 ],
			"obj-17::obj-15" : [ "Legato[4]", "Legato", 0 ],
			"obj-17::obj-20" : [ "Mute[10]", "Mute", 0 ],
			"obj-17::obj-29" : [ "Decay[4]", "Decay", 0 ],
			"obj-17::obj-31" : [ "Release[4]", "Release", 0 ],
			"obj-17::obj-32" : [ "Sustain[4]", "Sustain", 0 ],
			"obj-18::obj-33" : [ "Quadrants[5]", "Quadrants", 0 ],
			"obj-18::obj-55" : [ "Bypass[5]", "Bypass", 0 ],
			"obj-18::obj-80" : [ "Response[5]", "Response", 0 ],
			"obj-19::obj-33" : [ "Quadrants[4]", "Quadrants", 0 ],
			"obj-19::obj-55" : [ "Bypass[4]", "Bypass", 0 ],
			"obj-19::obj-80" : [ "Response[4]", "Response", 0 ],
			"obj-20::obj-11" : [ "Resonance", "Res", 0 ],
			"obj-20::obj-26" : [ "spectral", "spectral", 0 ],
			"obj-20::obj-51" : [ "CV2[6]", "CV2", 0 ],
			"obj-20::obj-54" : [ "CV1", "CV1", 0 ],
			"obj-20::obj-55" : [ "power", "power", 0 ],
			"obj-20::obj-59" : [ "filter_mode", "filter_mode", 0 ],
			"obj-20::obj-63" : [ "CV3[6]", "CV3", 0 ],
			"obj-20::obj-95" : [ "Freq[6]", "Freq", 0 ],
			"obj-20::obj-98" : [ "Gain", "Gain", 0 ],
			"obj-21::obj-11" : [ "Resonance[1]", "Res", 0 ],
			"obj-21::obj-26" : [ "spectral[1]", "spectral", 0 ],
			"obj-21::obj-51" : [ "CV2[7]", "CV2", 0 ],
			"obj-21::obj-54" : [ "CV1[1]", "CV1", 0 ],
			"obj-21::obj-55" : [ "power[1]", "power", 0 ],
			"obj-21::obj-59" : [ "filter_mode[1]", "filter_mode", 0 ],
			"obj-21::obj-63" : [ "CV3[7]", "CV3", 0 ],
			"obj-21::obj-95" : [ "Freq[7]", "Freq", 0 ],
			"obj-21::obj-98" : [ "Gain[1]", "Gain", 0 ],
			"obj-22::obj-11" : [ "Resonance[2]", "Res", 0 ],
			"obj-22::obj-26" : [ "spectral[2]", "spectral", 0 ],
			"obj-22::obj-51" : [ "CV2[8]", "CV2", 0 ],
			"obj-22::obj-54" : [ "CV1[2]", "CV1", 0 ],
			"obj-22::obj-55" : [ "power[2]", "power", 0 ],
			"obj-22::obj-59" : [ "filter_mode[2]", "filter_mode", 0 ],
			"obj-22::obj-63" : [ "CV3[8]", "CV3", 0 ],
			"obj-22::obj-95" : [ "Freq[8]", "Freq", 0 ],
			"obj-22::obj-98" : [ "Gain[2]", "Gain", 0 ],
			"obj-25::obj-55" : [ "Bypass[6]", "Bypass", 0 ],
			"obj-25::obj-69" : [ "NoiseType", "NoiseType", 0 ],
			"obj-26::obj-55" : [ "Bypass[7]", "Bypass", 0 ],
			"obj-29::obj-1" : [ "Time Mode[3]", "Time Mode", 1 ],
			"obj-29::obj-12" : [ "Mute[12]", "Mute", 0 ],
			"obj-29::obj-123" : [ "Level[1]", "Level", 0 ],
			"obj-29::obj-144" : [ "Phase[3]", "Phase", 0 ],
			"obj-29::obj-186" : [ "Re-Trigger[2]", "Re-Trigger", 0 ],
			"obj-29::obj-191" : [ "SyncRate[2]", "Rate", 0 ],
			"obj-29::obj-212" : [ "Hold[4]", "Hold", 0 ],
			"obj-29::obj-214" : [ "Invert[2]", "Phase-Inversion", 1 ],
			"obj-29::obj-219" : [ "Phase[2]", "Phase", 0 ],
			"obj-29::obj-223" : [ "Time Mode[4]", "Time Mode", 1 ],
			"obj-29::obj-224" : [ "FreqRate[2]", "Rate", 0 ],
			"obj-29::obj-30" : [ "Time Mode[5]", "Time Mode", 1 ],
			"obj-29::obj-32" : [ "live.tab[1]", "live.tab", 0 ],
			"obj-29::obj-49" : [ "PulseWidth[5]", "PulseWidth", 0 ],
			"obj-29::obj-55" : [ "Hold[5]", "Hold", 0 ],
			"obj-29::obj-57" : [ "Invert[3]", "Phase-Inversion", 1 ],
			"obj-29::obj-58" : [ "SyncRate[3]", "Rate", 0 ],
			"obj-29::obj-61" : [ "PulseWidth[4]", "PulseWidth", 0 ],
			"obj-29::obj-66" : [ "Max pulse[2]", "Max pulse", 0 ],
			"obj-29::obj-67" : [ "Reset[4]", "Reset", 0 ],
			"obj-29::obj-81" : [ "Reset[3]", "Reset", 0 ],
			"obj-29::obj-89" : [ "FreqRate[3]", "Rate", 0 ],
			"obj-29::obj-94" : [ "Re-Trigger[3]", "Re-Trigger", 0 ],
			"obj-29::obj-96" : [ "PulseWidth[3]", "Pulse", 0 ],
			"obj-2::obj-106" : [ "CV3", "CV3", 0 ],
			"obj-2::obj-107" : [ "Linear", "Linear", 0 ],
			"obj-2::obj-11" : [ "PWM", "PWM", 0 ],
			"obj-2::obj-129" : [ "CV2", "CV2", 0 ],
			"obj-2::obj-36" : [ "PW", "PW", 0 ],
			"obj-2::obj-4" : [ "Waveform", "Waveform", 0 ],
			"obj-2::obj-45" : [ "FreqMode", "FreqMode", 0 ],
			"obj-2::obj-46" : [ "Offset", "Offset", 0 ],
			"obj-2::obj-51" : [ "Freq", "Freq", 0 ],
			"obj-2::obj-53" : [ "Mute", "Mute", 0 ],
			"obj-31::obj-20" : [ "bypass[5]", "bypass", 0 ],
			"obj-31::obj-3" : [ "Signal", "Signal", 0 ],
			"obj-32::obj-20" : [ "bypass[8]", "bypass", 0 ],
			"obj-32::obj-3" : [ "Signal[1]", "Signal", 0 ],
			"obj-33::obj-23" : [ "bypass", "bypass", 0 ],
			"obj-33::obj-28" : [ "Size", "Size", 0 ],
			"obj-33::obj-3" : [ "Regen", "Regen", 0 ],
			"obj-33::obj-60" : [ "Damp", "Damp", 0 ],
			"obj-33::obj-62" : [ "Dry", "Dry", 0 ],
			"obj-33::obj-63" : [ "Early", "Early", 0 ],
			"obj-33::obj-64" : [ "Tail", "Tail", 0 ],
			"obj-33::obj-65" : [ "Spread", "Spread", 0 ],
			"obj-33::obj-66" : [ "Time", "Time", 0 ],
			"obj-35::obj-23" : [ "in2", "in2", 0 ],
			"obj-35::obj-30" : [ "in4", "in4", 0 ],
			"obj-35::obj-36" : [ "in3", "in3", 0 ],
			"obj-35::obj-37" : [ "Mute[13]", "Mute", 0 ],
			"obj-35::obj-8" : [ "in1", "in1", 0 ],
			"obj-37::obj-11" : [ "Resonance[3]", "Res", 0 ],
			"obj-37::obj-26" : [ "spectral[3]", "spectral", 0 ],
			"obj-37::obj-51" : [ "CV2[9]", "CV2", 0 ],
			"obj-37::obj-54" : [ "CV1[3]", "CV1", 0 ],
			"obj-37::obj-55" : [ "power[3]", "power", 0 ],
			"obj-37::obj-59" : [ "filter_mode[3]", "filter_mode", 0 ],
			"obj-37::obj-63" : [ "CV3[9]", "CV3", 0 ],
			"obj-37::obj-95" : [ "Freq[9]", "Freq", 0 ],
			"obj-37::obj-98" : [ "Gain[3]", "Gain", 0 ],
			"obj-38::obj-11" : [ "Resonance[4]", "Res", 0 ],
			"obj-38::obj-26" : [ "spectral[4]", "spectral", 0 ],
			"obj-38::obj-51" : [ "CV2[10]", "CV2", 0 ],
			"obj-38::obj-54" : [ "CV1[4]", "CV1", 0 ],
			"obj-38::obj-55" : [ "power[4]", "power", 0 ],
			"obj-38::obj-59" : [ "filter_mode[4]", "filter_mode", 0 ],
			"obj-38::obj-63" : [ "CV3[10]", "CV3", 0 ],
			"obj-38::obj-95" : [ "Freq[10]", "Freq", 0 ],
			"obj-38::obj-98" : [ "Gain[4]", "Gain", 0 ],
			"obj-39::obj-11" : [ "Resonance[5]", "Res", 0 ],
			"obj-39::obj-26" : [ "spectral[5]", "spectral", 0 ],
			"obj-39::obj-51" : [ "CV2[11]", "CV2", 0 ],
			"obj-39::obj-54" : [ "CV1[5]", "CV1", 0 ],
			"obj-39::obj-55" : [ "power[5]", "power", 0 ],
			"obj-39::obj-59" : [ "filter_mode[5]", "filter_mode", 0 ],
			"obj-39::obj-63" : [ "CV3[11]", "CV3", 0 ],
			"obj-39::obj-95" : [ "Freq[11]", "Freq", 0 ],
			"obj-39::obj-98" : [ "Gain[5]", "Gain", 0 ],
			"obj-3::obj-106" : [ "CV3[1]", "CV3", 0 ],
			"obj-3::obj-107" : [ "Linear[1]", "Linear", 0 ],
			"obj-3::obj-11" : [ "PWM[1]", "PWM", 0 ],
			"obj-3::obj-129" : [ "CV2[1]", "CV2", 0 ],
			"obj-3::obj-36" : [ "PW[1]", "PW", 0 ],
			"obj-3::obj-4" : [ "Waveform[1]", "Waveform", 0 ],
			"obj-3::obj-45" : [ "FreqMode[1]", "FreqMode", 0 ],
			"obj-3::obj-46" : [ "Offset[1]", "Offset", 0 ],
			"obj-3::obj-51" : [ "Freq[1]", "Freq", 0 ],
			"obj-3::obj-53" : [ "Mute[1]", "Mute", 0 ],
			"obj-45::obj-23" : [ "bypass[3]", "bypass", 0 ],
			"obj-45::obj-28" : [ "Size[1]", "Size", 0 ],
			"obj-45::obj-3" : [ "Regen[1]", "Regen", 0 ],
			"obj-45::obj-60" : [ "Damp[1]", "Damp", 0 ],
			"obj-45::obj-62" : [ "Dry[1]", "Dry", 0 ],
			"obj-45::obj-63" : [ "Early[1]", "Early", 0 ],
			"obj-45::obj-64" : [ "Tail[1]", "Tail", 0 ],
			"obj-45::obj-65" : [ "Spread[1]", "Spread", 0 ],
			"obj-45::obj-66" : [ "Time[1]", "Time", 0 ],
			"obj-46::obj-23" : [ "bypass[4]", "bypass", 0 ],
			"obj-46::obj-28" : [ "Size[2]", "Size", 0 ],
			"obj-46::obj-3" : [ "Regen[2]", "Regen", 0 ],
			"obj-46::obj-60" : [ "Damp[2]", "Damp", 0 ],
			"obj-46::obj-62" : [ "Dry[2]", "Dry", 0 ],
			"obj-46::obj-63" : [ "Early[2]", "Early", 0 ],
			"obj-46::obj-64" : [ "Tail[2]", "Tail", 0 ],
			"obj-46::obj-65" : [ "Spread[2]", "Spread", 0 ],
			"obj-46::obj-66" : [ "Time[2]", "Time", 0 ],
			"obj-4::obj-106" : [ "CV3[3]", "CV3", 0 ],
			"obj-4::obj-107" : [ "Linear[3]", "Linear", 0 ],
			"obj-4::obj-11" : [ "PWM[3]", "PWM", 0 ],
			"obj-4::obj-129" : [ "CV2[3]", "CV2", 0 ],
			"obj-4::obj-36" : [ "PW[3]", "PW", 0 ],
			"obj-4::obj-4" : [ "Waveform[3]", "Waveform", 0 ],
			"obj-4::obj-45" : [ "FreqMode[3]", "FreqMode", 0 ],
			"obj-4::obj-46" : [ "Offset[3]", "Offset", 0 ],
			"obj-4::obj-51" : [ "Freq[3]", "Freq", 0 ],
			"obj-4::obj-53" : [ "Mute[3]", "Mute", 0 ],
			"obj-51" : [ "live.gain~", "live.gain~", 0 ],
			"obj-55::obj-100" : [ "score", "score", 0 ],
			"obj-55::obj-105" : [ "rounding", "rounding", 0 ],
			"obj-55::obj-12" : [ "bypass[6]", "bypass", 0 ],
			"obj-55::obj-14::obj-2" : [ "pastebang", "pastebang", 0 ],
			"obj-55::obj-71" : [ "notes", "notes", 1 ],
			"obj-55::obj-77::obj-2" : [ "pastebang[1]", "pastebang", 0 ],
			"obj-56::obj-1" : [ "Time Mode[7]", "Time Mode", 1 ],
			"obj-56::obj-12" : [ "Mute[15]", "Mute", 0 ],
			"obj-56::obj-123" : [ "Level[2]", "Level", 0 ],
			"obj-56::obj-144" : [ "Phase[4]", "Phase", 0 ],
			"obj-56::obj-186" : [ "Re-Trigger[5]", "Re-Trigger", 0 ],
			"obj-56::obj-191" : [ "SyncRate[5]", "Rate", 0 ],
			"obj-56::obj-212" : [ "Hold[2]", "Hold", 0 ],
			"obj-56::obj-214" : [ "Invert[4]", "Phase-Inversion", 1 ],
			"obj-56::obj-219" : [ "Phase[5]", "Phase", 0 ],
			"obj-56::obj-223" : [ "Time Mode[8]", "Time Mode", 1 ],
			"obj-56::obj-224" : [ "FreqRate[5]", "Rate", 0 ],
			"obj-56::obj-30" : [ "Time Mode[6]", "Time Mode", 1 ],
			"obj-56::obj-32" : [ "live.tab[2]", "live.tab", 0 ],
			"obj-56::obj-49" : [ "PulseWidth[6]", "PulseWidth", 0 ],
			"obj-56::obj-55" : [ "Hold[1]", "Hold", 0 ],
			"obj-56::obj-57" : [ "Invert[5]", "Phase-Inversion", 1 ],
			"obj-56::obj-58" : [ "SyncRate[4]", "Rate", 0 ],
			"obj-56::obj-61" : [ "PulseWidth[8]", "PulseWidth", 0 ],
			"obj-56::obj-66" : [ "Max pulse[3]", "Max pulse", 0 ],
			"obj-56::obj-67" : [ "Reset[6]", "Reset", 0 ],
			"obj-56::obj-81" : [ "Reset[5]", "Reset", 0 ],
			"obj-56::obj-89" : [ "FreqRate[4]", "Rate", 0 ],
			"obj-56::obj-94" : [ "Re-Trigger[4]", "Re-Trigger", 0 ],
			"obj-56::obj-96" : [ "PulseWidth[7]", "Pulse", 0 ],
			"obj-57::obj-100" : [ "score[1]", "score", 0 ],
			"obj-57::obj-105" : [ "rounding[1]", "rounding", 0 ],
			"obj-57::obj-12" : [ "bypass[7]", "bypass", 0 ],
			"obj-57::obj-14::obj-2" : [ "pastebang[2]", "pastebang", 0 ],
			"obj-57::obj-71" : [ "notes[1]", "notes", 1 ],
			"obj-57::obj-77::obj-2" : [ "pastebang[3]", "pastebang", 0 ],
			"obj-59::obj-55" : [ "Bypass[8]", "Bypass", 0 ],
			"obj-5::obj-106" : [ "CV3[2]", "CV3", 0 ],
			"obj-5::obj-107" : [ "Linear[2]", "Linear", 0 ],
			"obj-5::obj-11" : [ "PWM[2]", "PWM", 0 ],
			"obj-5::obj-129" : [ "CV2[2]", "CV2", 0 ],
			"obj-5::obj-36" : [ "PW[2]", "PW", 0 ],
			"obj-5::obj-4" : [ "Waveform[2]", "Waveform", 0 ],
			"obj-5::obj-45" : [ "FreqMode[2]", "FreqMode", 0 ],
			"obj-5::obj-46" : [ "Offset[2]", "Offset", 0 ],
			"obj-5::obj-51" : [ "Freq[2]", "Freq", 0 ],
			"obj-5::obj-53" : [ "Mute[2]", "Mute", 0 ],
			"obj-60::obj-55" : [ "Mute[16]", "Mute", 0 ],
			"obj-60::obj-69" : [ "NoiseType[1]", "NoiseType", 0 ],
			"obj-6::obj-106" : [ "CV3[5]", "CV3", 0 ],
			"obj-6::obj-107" : [ "Linear[5]", "Linear", 0 ],
			"obj-6::obj-11" : [ "PWM[5]", "PWM", 0 ],
			"obj-6::obj-129" : [ "CV2[5]", "CV2", 0 ],
			"obj-6::obj-36" : [ "PW[5]", "PW", 0 ],
			"obj-6::obj-4" : [ "Waveform[5]", "Waveform", 0 ],
			"obj-6::obj-45" : [ "FreqMode[5]", "FreqMode", 0 ],
			"obj-6::obj-46" : [ "Offset[5]", "Offset", 0 ],
			"obj-6::obj-51" : [ "Freq[5]", "Freq", 0 ],
			"obj-6::obj-53" : [ "Mute[5]", "Mute", 0 ],
			"obj-73::obj-12" : [ "Mute[19]", "Mute", 0 ],
			"obj-73::obj-20" : [ "Frequency[3]", "Freq", 0 ],
			"obj-73::obj-7" : [ "CV", "CV", 0 ],
			"obj-73::obj-75" : [ "SpectraLFOShape[2]", "Shape", 0 ],
			"obj-74::obj-12" : [ "Mute[20]", "Mute", 0 ],
			"obj-74::obj-20" : [ "Frequency[4]", "Freq", 0 ],
			"obj-74::obj-7" : [ "CV[1]", "CV", 0 ],
			"obj-74::obj-75" : [ "SpectraLFOShape[3]", "Shape", 0 ],
			"obj-7::obj-106" : [ "CV3[4]", "CV3", 0 ],
			"obj-7::obj-107" : [ "Linear[4]", "Linear", 0 ],
			"obj-7::obj-11" : [ "PWM[4]", "PWM", 0 ],
			"obj-7::obj-129" : [ "CV2[4]", "CV2", 0 ],
			"obj-7::obj-36" : [ "PW[4]", "PW", 0 ],
			"obj-7::obj-4" : [ "Waveform[4]", "Waveform", 0 ],
			"obj-7::obj-45" : [ "FreqMode[4]", "FreqMode", 0 ],
			"obj-7::obj-46" : [ "Offset[4]", "Offset", 0 ],
			"obj-7::obj-51" : [ "Freq[4]", "Freq", 0 ],
			"obj-7::obj-53" : [ "Mute[4]", "Mute", 0 ],
			"obj-8::obj-33" : [ "Quadrants", "Quadrants", 0 ],
			"obj-8::obj-55" : [ "Bypass", "Bypass", 0 ],
			"obj-8::obj-80" : [ "Response", "Response", 0 ],
			"obj-9::obj-33" : [ "Quadrants[1]", "Quadrants", 0 ],
			"obj-9::obj-55" : [ "Bypass[1]", "Bypass", 0 ],
			"obj-9::obj-80" : [ "Response[1]", "Response", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"parameter_overrides" : 			{
				"obj-10::obj-33" : 				{
					"parameter_longname" : "Quadrants[3]"
				}
,
				"obj-10::obj-55" : 				{
					"parameter_longname" : "Bypass[3]"
				}
,
				"obj-10::obj-80" : 				{
					"parameter_longname" : "Response[3]"
				}
,
				"obj-11::obj-33" : 				{
					"parameter_longname" : "Quadrants[2]"
				}
,
				"obj-11::obj-55" : 				{
					"parameter_longname" : "Bypass[2]"
				}
,
				"obj-11::obj-80" : 				{
					"parameter_longname" : "Response[2]"
				}
,
				"obj-12::obj-20" : 				{
					"parameter_longname" : "Mute[6]"
				}
,
				"obj-13::obj-1" : 				{
					"parameter_longname" : "Attack[1]"
				}
,
				"obj-13::obj-15" : 				{
					"parameter_longname" : "Legato[1]"
				}
,
				"obj-13::obj-20" : 				{
					"parameter_longname" : "Mute[7]"
				}
,
				"obj-13::obj-29" : 				{
					"parameter_longname" : "Decay[1]"
				}
,
				"obj-13::obj-31" : 				{
					"parameter_longname" : "Release[1]"
				}
,
				"obj-13::obj-32" : 				{
					"parameter_longname" : "Sustain[1]"
				}
,
				"obj-14::obj-1" : 				{
					"parameter_longname" : "Attack[2]"
				}
,
				"obj-14::obj-15" : 				{
					"parameter_longname" : "Legato[2]"
				}
,
				"obj-14::obj-20" : 				{
					"parameter_longname" : "Mute[8]"
				}
,
				"obj-14::obj-29" : 				{
					"parameter_longname" : "Decay[2]"
				}
,
				"obj-14::obj-31" : 				{
					"parameter_longname" : "Release[2]"
				}
,
				"obj-14::obj-32" : 				{
					"parameter_longname" : "Sustain[2]"
				}
,
				"obj-15::obj-1" : 				{
					"parameter_longname" : "Attack[3]"
				}
,
				"obj-15::obj-15" : 				{
					"parameter_longname" : "Legato[3]"
				}
,
				"obj-15::obj-20" : 				{
					"parameter_longname" : "Mute[9]"
				}
,
				"obj-15::obj-29" : 				{
					"parameter_longname" : "Decay[3]"
				}
,
				"obj-15::obj-31" : 				{
					"parameter_longname" : "Release[3]"
				}
,
				"obj-15::obj-32" : 				{
					"parameter_longname" : "Sustain[3]"
				}
,
				"obj-16::obj-1" : 				{
					"parameter_longname" : "Attack[5]"
				}
,
				"obj-16::obj-15" : 				{
					"parameter_longname" : "Legato[5]"
				}
,
				"obj-16::obj-20" : 				{
					"parameter_longname" : "Mute[11]"
				}
,
				"obj-16::obj-29" : 				{
					"parameter_longname" : "Decay[5]"
				}
,
				"obj-16::obj-31" : 				{
					"parameter_longname" : "Release[5]"
				}
,
				"obj-16::obj-32" : 				{
					"parameter_longname" : "Sustain[5]"
				}
,
				"obj-17::obj-1" : 				{
					"parameter_longname" : "Attack[4]"
				}
,
				"obj-17::obj-15" : 				{
					"parameter_longname" : "Legato[4]"
				}
,
				"obj-17::obj-20" : 				{
					"parameter_longname" : "Mute[10]"
				}
,
				"obj-17::obj-29" : 				{
					"parameter_longname" : "Decay[4]"
				}
,
				"obj-17::obj-31" : 				{
					"parameter_longname" : "Release[4]"
				}
,
				"obj-17::obj-32" : 				{
					"parameter_longname" : "Sustain[4]"
				}
,
				"obj-18::obj-33" : 				{
					"parameter_longname" : "Quadrants[5]"
				}
,
				"obj-18::obj-55" : 				{
					"parameter_longname" : "Bypass[5]"
				}
,
				"obj-18::obj-80" : 				{
					"parameter_longname" : "Response[5]"
				}
,
				"obj-19::obj-33" : 				{
					"parameter_longname" : "Quadrants[4]"
				}
,
				"obj-19::obj-55" : 				{
					"parameter_longname" : "Bypass[4]"
				}
,
				"obj-19::obj-80" : 				{
					"parameter_longname" : "Response[4]"
				}
,
				"obj-20::obj-51" : 				{
					"parameter_longname" : "CV2[6]"
				}
,
				"obj-20::obj-63" : 				{
					"parameter_longname" : "CV3[6]"
				}
,
				"obj-20::obj-95" : 				{
					"parameter_longname" : "Freq[6]"
				}
,
				"obj-21::obj-11" : 				{
					"parameter_longname" : "Resonance[1]"
				}
,
				"obj-21::obj-26" : 				{
					"parameter_longname" : "spectral[1]"
				}
,
				"obj-21::obj-51" : 				{
					"parameter_longname" : "CV2[7]"
				}
,
				"obj-21::obj-54" : 				{
					"parameter_longname" : "CV1[1]"
				}
,
				"obj-21::obj-55" : 				{
					"parameter_longname" : "power[1]"
				}
,
				"obj-21::obj-59" : 				{
					"parameter_longname" : "filter_mode[1]"
				}
,
				"obj-21::obj-63" : 				{
					"parameter_longname" : "CV3[7]"
				}
,
				"obj-21::obj-95" : 				{
					"parameter_longname" : "Freq[7]"
				}
,
				"obj-21::obj-98" : 				{
					"parameter_longname" : "Gain[1]"
				}
,
				"obj-22::obj-11" : 				{
					"parameter_longname" : "Resonance[2]"
				}
,
				"obj-22::obj-26" : 				{
					"parameter_longname" : "spectral[2]"
				}
,
				"obj-22::obj-51" : 				{
					"parameter_longname" : "CV2[8]"
				}
,
				"obj-22::obj-54" : 				{
					"parameter_longname" : "CV1[2]"
				}
,
				"obj-22::obj-55" : 				{
					"parameter_longname" : "power[2]"
				}
,
				"obj-22::obj-59" : 				{
					"parameter_longname" : "filter_mode[2]"
				}
,
				"obj-22::obj-63" : 				{
					"parameter_longname" : "CV3[8]"
				}
,
				"obj-22::obj-95" : 				{
					"parameter_longname" : "Freq[8]"
				}
,
				"obj-22::obj-98" : 				{
					"parameter_longname" : "Gain[2]"
				}
,
				"obj-25::obj-55" : 				{
					"parameter_longname" : "Bypass[6]",
					"parameter_shortname" : "Bypass"
				}
,
				"obj-26::obj-55" : 				{
					"parameter_longname" : "Bypass[7]"
				}
,
				"obj-29::obj-12" : 				{
					"parameter_longname" : "Mute[12]"
				}
,
				"obj-31::obj-20" : 				{
					"parameter_longname" : "bypass[5]"
				}
,
				"obj-32::obj-20" : 				{
					"parameter_longname" : "bypass[8]"
				}
,
				"obj-32::obj-3" : 				{
					"parameter_longname" : "Signal[1]"
				}
,
				"obj-35::obj-37" : 				{
					"parameter_longname" : "Mute[13]"
				}
,
				"obj-37::obj-11" : 				{
					"parameter_longname" : "Resonance[3]"
				}
,
				"obj-37::obj-26" : 				{
					"parameter_longname" : "spectral[3]"
				}
,
				"obj-37::obj-51" : 				{
					"parameter_longname" : "CV2[9]"
				}
,
				"obj-37::obj-54" : 				{
					"parameter_longname" : "CV1[3]"
				}
,
				"obj-37::obj-55" : 				{
					"parameter_longname" : "power[3]"
				}
,
				"obj-37::obj-59" : 				{
					"parameter_longname" : "filter_mode[3]"
				}
,
				"obj-37::obj-63" : 				{
					"parameter_longname" : "CV3[9]"
				}
,
				"obj-37::obj-95" : 				{
					"parameter_longname" : "Freq[9]"
				}
,
				"obj-37::obj-98" : 				{
					"parameter_longname" : "Gain[3]"
				}
,
				"obj-38::obj-11" : 				{
					"parameter_longname" : "Resonance[4]"
				}
,
				"obj-38::obj-26" : 				{
					"parameter_longname" : "spectral[4]"
				}
,
				"obj-38::obj-51" : 				{
					"parameter_longname" : "CV2[10]"
				}
,
				"obj-38::obj-54" : 				{
					"parameter_longname" : "CV1[4]"
				}
,
				"obj-38::obj-55" : 				{
					"parameter_longname" : "power[4]"
				}
,
				"obj-38::obj-59" : 				{
					"parameter_longname" : "filter_mode[4]"
				}
,
				"obj-38::obj-63" : 				{
					"parameter_longname" : "CV3[10]"
				}
,
				"obj-38::obj-95" : 				{
					"parameter_longname" : "Freq[10]"
				}
,
				"obj-38::obj-98" : 				{
					"parameter_longname" : "Gain[4]"
				}
,
				"obj-39::obj-11" : 				{
					"parameter_longname" : "Resonance[5]"
				}
,
				"obj-39::obj-26" : 				{
					"parameter_longname" : "spectral[5]"
				}
,
				"obj-39::obj-51" : 				{
					"parameter_longname" : "CV2[11]"
				}
,
				"obj-39::obj-54" : 				{
					"parameter_longname" : "CV1[5]"
				}
,
				"obj-39::obj-55" : 				{
					"parameter_longname" : "power[5]"
				}
,
				"obj-39::obj-59" : 				{
					"parameter_longname" : "filter_mode[5]"
				}
,
				"obj-39::obj-63" : 				{
					"parameter_longname" : "CV3[11]"
				}
,
				"obj-39::obj-95" : 				{
					"parameter_longname" : "Freq[11]"
				}
,
				"obj-39::obj-98" : 				{
					"parameter_longname" : "Gain[5]"
				}
,
				"obj-3::obj-106" : 				{
					"parameter_longname" : "CV3[1]"
				}
,
				"obj-3::obj-107" : 				{
					"parameter_longname" : "Linear[1]"
				}
,
				"obj-3::obj-11" : 				{
					"parameter_longname" : "PWM[1]"
				}
,
				"obj-3::obj-129" : 				{
					"parameter_longname" : "CV2[1]"
				}
,
				"obj-3::obj-36" : 				{
					"parameter_longname" : "PW[1]"
				}
,
				"obj-3::obj-4" : 				{
					"parameter_longname" : "Waveform[1]"
				}
,
				"obj-3::obj-45" : 				{
					"parameter_longname" : "FreqMode[1]"
				}
,
				"obj-3::obj-46" : 				{
					"parameter_longname" : "Offset[1]"
				}
,
				"obj-3::obj-51" : 				{
					"parameter_longname" : "Freq[1]"
				}
,
				"obj-3::obj-53" : 				{
					"parameter_longname" : "Mute[1]"
				}
,
				"obj-45::obj-23" : 				{
					"parameter_longname" : "bypass[3]"
				}
,
				"obj-45::obj-28" : 				{
					"parameter_longname" : "Size[1]"
				}
,
				"obj-45::obj-3" : 				{
					"parameter_longname" : "Regen[1]"
				}
,
				"obj-45::obj-60" : 				{
					"parameter_longname" : "Damp[1]"
				}
,
				"obj-45::obj-62" : 				{
					"parameter_longname" : "Dry[1]"
				}
,
				"obj-45::obj-63" : 				{
					"parameter_longname" : "Early[1]"
				}
,
				"obj-45::obj-64" : 				{
					"parameter_longname" : "Tail[1]"
				}
,
				"obj-45::obj-65" : 				{
					"parameter_longname" : "Spread[1]"
				}
,
				"obj-45::obj-66" : 				{
					"parameter_longname" : "Time[1]"
				}
,
				"obj-46::obj-23" : 				{
					"parameter_longname" : "bypass[4]"
				}
,
				"obj-46::obj-28" : 				{
					"parameter_longname" : "Size[2]"
				}
,
				"obj-46::obj-3" : 				{
					"parameter_longname" : "Regen[2]"
				}
,
				"obj-46::obj-60" : 				{
					"parameter_longname" : "Damp[2]"
				}
,
				"obj-46::obj-62" : 				{
					"parameter_longname" : "Dry[2]"
				}
,
				"obj-46::obj-63" : 				{
					"parameter_longname" : "Early[2]"
				}
,
				"obj-46::obj-64" : 				{
					"parameter_longname" : "Tail[2]"
				}
,
				"obj-46::obj-65" : 				{
					"parameter_longname" : "Spread[2]"
				}
,
				"obj-46::obj-66" : 				{
					"parameter_longname" : "Time[2]"
				}
,
				"obj-4::obj-106" : 				{
					"parameter_longname" : "CV3[3]"
				}
,
				"obj-4::obj-107" : 				{
					"parameter_longname" : "Linear[3]"
				}
,
				"obj-4::obj-11" : 				{
					"parameter_longname" : "PWM[3]"
				}
,
				"obj-4::obj-129" : 				{
					"parameter_longname" : "CV2[3]"
				}
,
				"obj-4::obj-36" : 				{
					"parameter_longname" : "PW[3]"
				}
,
				"obj-4::obj-4" : 				{
					"parameter_longname" : "Waveform[3]"
				}
,
				"obj-4::obj-45" : 				{
					"parameter_longname" : "FreqMode[3]"
				}
,
				"obj-4::obj-46" : 				{
					"parameter_longname" : "Offset[3]"
				}
,
				"obj-4::obj-51" : 				{
					"parameter_longname" : "Freq[3]"
				}
,
				"obj-4::obj-53" : 				{
					"parameter_longname" : "Mute[3]"
				}
,
				"obj-55::obj-12" : 				{
					"parameter_longname" : "bypass[6]"
				}
,
				"obj-55::obj-77::obj-2" : 				{
					"parameter_longname" : "pastebang[1]"
				}
,
				"obj-56::obj-1" : 				{
					"parameter_longname" : "Time Mode[7]"
				}
,
				"obj-56::obj-12" : 				{
					"parameter_longname" : "Mute[15]"
				}
,
				"obj-56::obj-123" : 				{
					"parameter_longname" : "Level[2]"
				}
,
				"obj-56::obj-144" : 				{
					"parameter_longname" : "Phase[4]"
				}
,
				"obj-56::obj-186" : 				{
					"parameter_longname" : "Re-Trigger[5]"
				}
,
				"obj-56::obj-191" : 				{
					"parameter_longname" : "SyncRate[5]"
				}
,
				"obj-56::obj-212" : 				{
					"parameter_longname" : "Hold[2]"
				}
,
				"obj-56::obj-214" : 				{
					"parameter_longname" : "Invert[4]"
				}
,
				"obj-56::obj-219" : 				{
					"parameter_longname" : "Phase[5]"
				}
,
				"obj-56::obj-223" : 				{
					"parameter_longname" : "Time Mode[8]"
				}
,
				"obj-56::obj-224" : 				{
					"parameter_longname" : "FreqRate[5]"
				}
,
				"obj-56::obj-30" : 				{
					"parameter_longname" : "Time Mode[6]"
				}
,
				"obj-56::obj-32" : 				{
					"parameter_longname" : "live.tab[2]"
				}
,
				"obj-56::obj-49" : 				{
					"parameter_longname" : "PulseWidth[6]"
				}
,
				"obj-56::obj-55" : 				{
					"parameter_longname" : "Hold[1]"
				}
,
				"obj-56::obj-57" : 				{
					"parameter_longname" : "Invert[5]"
				}
,
				"obj-56::obj-58" : 				{
					"parameter_longname" : "SyncRate[4]"
				}
,
				"obj-56::obj-61" : 				{
					"parameter_longname" : "PulseWidth[8]"
				}
,
				"obj-56::obj-66" : 				{
					"parameter_longname" : "Max pulse[3]"
				}
,
				"obj-56::obj-67" : 				{
					"parameter_longname" : "Reset[6]"
				}
,
				"obj-56::obj-81" : 				{
					"parameter_longname" : "Reset[5]"
				}
,
				"obj-56::obj-89" : 				{
					"parameter_longname" : "FreqRate[4]"
				}
,
				"obj-56::obj-94" : 				{
					"parameter_longname" : "Re-Trigger[4]"
				}
,
				"obj-56::obj-96" : 				{
					"parameter_longname" : "PulseWidth[7]"
				}
,
				"obj-57::obj-100" : 				{
					"parameter_longname" : "score[1]"
				}
,
				"obj-57::obj-105" : 				{
					"parameter_longname" : "rounding[1]"
				}
,
				"obj-57::obj-12" : 				{
					"parameter_longname" : "bypass[7]"
				}
,
				"obj-57::obj-14::obj-2" : 				{
					"parameter_longname" : "pastebang[2]"
				}
,
				"obj-57::obj-77::obj-2" : 				{
					"parameter_longname" : "pastebang[3]"
				}
,
				"obj-59::obj-55" : 				{
					"parameter_longname" : "Bypass[8]"
				}
,
				"obj-5::obj-106" : 				{
					"parameter_longname" : "CV3[2]"
				}
,
				"obj-5::obj-107" : 				{
					"parameter_longname" : "Linear[2]"
				}
,
				"obj-5::obj-11" : 				{
					"parameter_longname" : "PWM[2]"
				}
,
				"obj-5::obj-129" : 				{
					"parameter_longname" : "CV2[2]"
				}
,
				"obj-5::obj-36" : 				{
					"parameter_longname" : "PW[2]"
				}
,
				"obj-5::obj-4" : 				{
					"parameter_longname" : "Waveform[2]"
				}
,
				"obj-5::obj-45" : 				{
					"parameter_longname" : "FreqMode[2]"
				}
,
				"obj-5::obj-46" : 				{
					"parameter_longname" : "Offset[2]"
				}
,
				"obj-5::obj-51" : 				{
					"parameter_longname" : "Freq[2]"
				}
,
				"obj-5::obj-53" : 				{
					"parameter_longname" : "Mute[2]"
				}
,
				"obj-60::obj-55" : 				{
					"parameter_longname" : "Mute[16]"
				}
,
				"obj-60::obj-69" : 				{
					"parameter_longname" : "NoiseType[1]"
				}
,
				"obj-6::obj-106" : 				{
					"parameter_longname" : "CV3[5]"
				}
,
				"obj-6::obj-107" : 				{
					"parameter_longname" : "Linear[5]"
				}
,
				"obj-6::obj-11" : 				{
					"parameter_longname" : "PWM[5]"
				}
,
				"obj-6::obj-129" : 				{
					"parameter_longname" : "CV2[5]"
				}
,
				"obj-6::obj-36" : 				{
					"parameter_longname" : "PW[5]"
				}
,
				"obj-6::obj-4" : 				{
					"parameter_longname" : "Waveform[5]"
				}
,
				"obj-6::obj-45" : 				{
					"parameter_longname" : "FreqMode[5]"
				}
,
				"obj-6::obj-46" : 				{
					"parameter_longname" : "Offset[5]"
				}
,
				"obj-6::obj-51" : 				{
					"parameter_longname" : "Freq[5]"
				}
,
				"obj-6::obj-53" : 				{
					"parameter_longname" : "Mute[5]"
				}
,
				"obj-73::obj-12" : 				{
					"parameter_longname" : "Mute[19]"
				}
,
				"obj-74::obj-12" : 				{
					"parameter_longname" : "Mute[20]"
				}
,
				"obj-74::obj-20" : 				{
					"parameter_longname" : "Frequency[4]"
				}
,
				"obj-74::obj-7" : 				{
					"parameter_longname" : "CV[1]"
				}
,
				"obj-74::obj-75" : 				{
					"parameter_longname" : "SpectraLFOShape[3]"
				}
,
				"obj-7::obj-106" : 				{
					"parameter_longname" : "CV3[4]"
				}
,
				"obj-7::obj-107" : 				{
					"parameter_longname" : "Linear[4]"
				}
,
				"obj-7::obj-11" : 				{
					"parameter_longname" : "PWM[4]"
				}
,
				"obj-7::obj-129" : 				{
					"parameter_longname" : "CV2[4]"
				}
,
				"obj-7::obj-36" : 				{
					"parameter_longname" : "PW[4]"
				}
,
				"obj-7::obj-4" : 				{
					"parameter_longname" : "Waveform[4]"
				}
,
				"obj-7::obj-45" : 				{
					"parameter_longname" : "FreqMode[4]"
				}
,
				"obj-7::obj-46" : 				{
					"parameter_longname" : "Offset[4]"
				}
,
				"obj-7::obj-51" : 				{
					"parameter_longname" : "Freq[4]"
				}
,
				"obj-7::obj-53" : 				{
					"parameter_longname" : "Mute[4]"
				}
,
				"obj-9::obj-33" : 				{
					"parameter_longname" : "Quadrants[1]"
				}
,
				"obj-9::obj-55" : 				{
					"parameter_longname" : "Bypass[1]"
				}
,
				"obj-9::obj-80" : 				{
					"parameter_longname" : "Response[1]"
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "M4L.api.ObserveTransport.maxpat",
				"bootpath" : "C74:/patchers/m4l/LiveAPI resources/abstractions",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "SOUND.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "SOUND[1].maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "SOUND[2].maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "SOUND[3].maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../Documents/Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "background_sm.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.ADSR.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Envelope",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Attenuator.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Classroom Filter.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Filter",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Gigaverb.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Effects",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.LFO3.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/LFO",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Noise.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Random",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Oscillator.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Oscillator",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Pulse Designer.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Sequencer",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Quantizer.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Quantizer",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Sample and Hold.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.Stereo Mixer.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Mixers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp.VCA.maxpat",
				"bootpath" : "C74:/packages/BEAP/clippings/BEAP/Level",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "bp_change_to_pulse.gendsp",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "gDSP",
				"implicit" : 1
			}
, 			{
				"name" : "pastebang.maxpat",
				"bootpath" : "C74:/packages/BEAP/misc",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "sine.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "square.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "up.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
, 			{
				"name" : "updown.svg",
				"bootpath" : "C74:/media/max/picts/m4l-picts",
				"type" : "svg",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"snapshot" : 		{
			"filetype" : "C74Snapshot",
			"version" : 2,
			"minorversion" : 0,
			"name" : "snapshotlist",
			"origin" : "jpatcher",
			"type" : "list",
			"subtype" : "Undefined",
			"embed" : 1,
			"snapshot" : 			{
				"valuedictionary" : 				{
					"parameter_values" : 					{
						"Attack" : 632.455532033675922,
						"Attack[1]" : 632.455532033675922,
						"Attack[2]" : 632.455532033675922,
						"Attack[3]" : 632.455532033675922,
						"Attack[4]" : 632.455532033675922,
						"Attack[5]" : 632.455532033675922,
						"Bypass" : 0.0,
						"Bypass[1]" : 0.0,
						"Bypass[2]" : 0.0,
						"Bypass[3]" : 0.0,
						"Bypass[4]" : 0.0,
						"Bypass[5]" : 0.0,
						"Bypass[6]" : 0.0,
						"Bypass[7]" : 0.0,
						"Bypass[8]" : 0.0,
						"CV" : 0.4,
						"CV1" : 100.0,
						"CV1[1]" : 100.0,
						"CV1[2]" : 100.0,
						"CV1[3]" : 100.0,
						"CV1[4]" : 0.0,
						"CV1[5]" : 0.0,
						"CV2" : 100.0,
						"CV2[10]" : 0.0,
						"CV2[11]" : 0.0,
						"CV2[1]" : 100.0,
						"CV2[2]" : 0.0,
						"CV2[3]" : 0.0,
						"CV2[4]" : 0.0,
						"CV2[5]" : 0.0,
						"CV2[6]" : 0.0,
						"CV2[7]" : 0.0,
						"CV2[8]" : 0.0,
						"CV2[9]" : 0.0,
						"CV3" : 0.0,
						"CV3[10]" : 0.0,
						"CV3[11]" : 0.0,
						"CV3[1]" : 0.0,
						"CV3[2]" : 0.0,
						"CV3[3]" : 0.0,
						"CV3[4]" : 0.0,
						"CV3[5]" : 0.0,
						"CV3[6]" : 0.0,
						"CV3[7]" : 0.0,
						"CV3[8]" : 0.0,
						"CV3[9]" : 0.0,
						"CV[1]" : 0.4,
						"Damp" : 0.7,
						"Damp[1]" : 0.7,
						"Damp[2]" : 0.7,
						"Decay" : 2249.365300761396156,
						"Decay[1]" : 2249.365300761396156,
						"Decay[2]" : 2249.365300761396156,
						"Decay[3]" : 2249.365300761396156,
						"Decay[4]" : 2249.365300761396156,
						"Decay[5]" : 2249.365300761396156,
						"Dry" : 1.0,
						"Dry[1]" : 1.0,
						"Dry[2]" : 1.0,
						"Early" : 0.25,
						"Early[1]" : 0.25,
						"Early[2]" : 0.25,
						"Freq" : 6763.827789816807126,
						"FreqMode" : 1.0,
						"FreqMode[1]" : 1.0,
						"FreqMode[2]" : 1.0,
						"FreqMode[3]" : 1.0,
						"FreqMode[4]" : 1.0,
						"FreqMode[5]" : 1.0,
						"FreqRate[2]" : 10.236219000565489,
						"FreqRate[3]" : 13.907227292758982,
						"FreqRate[4]" : 13.907227292758982,
						"FreqRate[5]" : 10.236219000565489,
						"Freq[10]" : 7886.053977744127224,
						"Freq[11]" : 7886.053977744127224,
						"Freq[1]" : 6763.827789816807126,
						"Freq[2]" : 6763.827789816807126,
						"Freq[3]" : 6763.827789816807126,
						"Freq[4]" : 6763.827789816807126,
						"Freq[5]" : 6763.827789816807126,
						"Freq[6]" : 7886.053977744127224,
						"Freq[7]" : 7886.053977744127224,
						"Freq[8]" : 7886.053977744127224,
						"Freq[9]" : 7886.053977744127224,
						"Frequency[3]" : 21.515607393584318,
						"Frequency[4]" : 12.066788495946563,
						"Gain" : 4.0,
						"Gain[1]" : 4.0,
						"Gain[2]" : 4.0,
						"Gain[3]" : 4.0,
						"Gain[4]" : 4.0,
						"Gain[5]" : 4.0,
						"Hold[1]" : 0.0,
						"Hold[2]" : 0.0,
						"Hold[4]" : 0.0,
						"Hold[5]" : 0.0,
						"Legato" : 0.0,
						"Legato[1]" : 0.0,
						"Legato[2]" : 0.0,
						"Legato[3]" : 0.0,
						"Legato[4]" : 0.0,
						"Legato[5]" : 0.0,
						"Level[1]" : 100.0,
						"Level[2]" : 100.0,
						"Linear" : 0.0,
						"Linear[1]" : 0.0,
						"Linear[2]" : 0.0,
						"Linear[3]" : 0.0,
						"Linear[4]" : 0.0,
						"Linear[5]" : 0.0,
						"Mute" : 0.0,
						"Mute[10]" : 0.0,
						"Mute[11]" : 0.0,
						"Mute[12]" : 0.0,
						"Mute[13]" : 0.0,
						"Mute[15]" : 0.0,
						"Mute[16]" : 0.0,
						"Mute[19]" : 0.0,
						"Mute[1]" : 0.0,
						"Mute[20]" : 0.0,
						"Mute[2]" : 0.0,
						"Mute[3]" : 0.0,
						"Mute[4]" : 0.0,
						"Mute[5]" : 0.0,
						"Mute[6]" : 0.0,
						"Mute[7]" : 0.0,
						"Mute[8]" : 0.0,
						"Mute[9]" : 0.0,
						"NoiseType" : 0.0,
						"NoiseType[1]" : 0.0,
						"Offset" : 0.0,
						"Offset[1]" : 0.0,
						"Offset[2]" : 0.0,
						"Offset[3]" : 0.0,
						"Offset[4]" : 0.0,
						"Offset[5]" : 0.0,
						"PW" : 50.0,
						"PWM" : 0.0,
						"PWM[1]" : 0.0,
						"PWM[2]" : 0.0,
						"PWM[3]" : 0.0,
						"PWM[4]" : 0.0,
						"PWM[5]" : 0.0,
						"PW[1]" : 50.0,
						"PW[2]" : 50.0,
						"PW[3]" : 50.0,
						"PW[4]" : 50.0,
						"PW[5]" : 50.0,
						"Phase[2]" : 0.0,
						"Phase[3]" : 0.0,
						"Phase[4]" : 0.0,
						"Phase[5]" : 0.0,
						"PulseWidth[3]" : 50.0,
						"PulseWidth[4]" : 50.0,
						"PulseWidth[5]" : 50.0,
						"PulseWidth[6]" : 50.0,
						"PulseWidth[7]" : 50.0,
						"PulseWidth[8]" : 50.0,
						"Quadrants" : 0.0,
						"Quadrants[1]" : 0.0,
						"Quadrants[2]" : 0.0,
						"Quadrants[3]" : 0.0,
						"Quadrants[4]" : 0.0,
						"Quadrants[5]" : 0.0,
						"Re-Trigger[2]" : 0.0,
						"Re-Trigger[3]" : 0.0,
						"Re-Trigger[4]" : 0.0,
						"Re-Trigger[5]" : 0.0,
						"Regen" : 0.5,
						"Regen[1]" : 0.5,
						"Regen[2]" : 0.5,
						"Release" : 2000.0,
						"Release[1]" : 2000.0,
						"Release[2]" : 2000.0,
						"Release[3]" : 2000.0,
						"Release[4]" : 2000.0,
						"Release[5]" : 2000.0,
						"Resonance" : 2.413723461514075,
						"Resonance[1]" : 7.138132910333003,
						"Resonance[2]" : 7.925534485136142,
						"Resonance[3]" : 2.413723461514075,
						"Resonance[4]" : 2.413723461514075,
						"Resonance[5]" : 2.413723461514075,
						"Response" : 0.0,
						"Response[1]" : 0.0,
						"Response[2]" : 0.0,
						"Response[3]" : 0.0,
						"Response[4]" : 0.0,
						"Response[5]" : 0.0,
						"Signal" : 44.094488188976349,
						"Signal[1]" : 68.503937007873958,
						"Size" : 149.974981234360769,
						"Size[1]" : 149.974981234360769,
						"Size[2]" : 149.974981234360769,
						"SpectraLFOShape[2]" : 4.0,
						"SpectraLFOShape[3]" : 4.0,
						"Spread" : 23.0,
						"Spread[1]" : 23.0,
						"Spread[2]" : 23.0,
						"Sustain" : 70.0,
						"Sustain[1]" : 70.0,
						"Sustain[2]" : 70.0,
						"Sustain[3]" : 70.0,
						"Sustain[4]" : 70.0,
						"Sustain[5]" : 70.0,
						"SyncRate[2]" : 1.0,
						"SyncRate[3]" : 5.0,
						"SyncRate[4]" : 5.0,
						"SyncRate[5]" : 1.0,
						"Tail" : 0.25,
						"Tail[1]" : 0.25,
						"Tail[2]" : 0.25,
						"Time" : 11715.099855785485488,
						"Time[1]" : 11715.099855785485488,
						"Time[2]" : 11715.099855785485488,
						"Waveform" : 0.0,
						"Waveform[1]" : 0.0,
						"Waveform[2]" : 2.0,
						"Waveform[3]" : 2.0,
						"Waveform[4]" : 2.0,
						"Waveform[5]" : 2.0,
						"bypass" : 0.0,
						"bypass[3]" : 0.0,
						"bypass[4]" : 0.0,
						"bypass[5]" : 0.0,
						"bypass[6]" : 0.0,
						"bypass[7]" : 0.0,
						"bypass[8]" : 0.0,
						"filter_mode" : 0.0,
						"filter_mode[1]" : 0.0,
						"filter_mode[2]" : 0.0,
						"filter_mode[3]" : 0.0,
						"filter_mode[4]" : 0.0,
						"filter_mode[5]" : 0.0,
						"in1" : 0.0,
						"in2" : -72.0,
						"in3" : -72.0,
						"in4" : -72.0,
						"live.gain~" : -36.815554663213561,
						"live.tab[1]" : 1.0,
						"live.tab[2]" : 1.0,
						"power" : 0.0,
						"power[1]" : 0.0,
						"power[2]" : 0.0,
						"power[3]" : 0.0,
						"power[4]" : 0.0,
						"power[5]" : 0.0,
						"rounding" : 0.0,
						"rounding[1]" : 0.0,
						"score" : 1.0,
						"score[1]" : 1.0,
						"spectral" : 0.0,
						"spectral[1]" : 0.0,
						"spectral[2]" : 0.0,
						"spectral[3]" : 0.0,
						"spectral[4]" : 0.0,
						"spectral[5]" : 0.0,
						"Time Mode[3]" : 0.0,
						"Time Mode[4]" : 1.0,
						"Time Mode[5]" : 1.0,
						"Time Mode[6]" : 1.0,
						"Time Mode[7]" : 0.0,
						"Time Mode[8]" : 1.0,
						"blob" : 						{
							"Reset[3]" : [ 0 ],
							"Reset[4]" : [ 0 ],
							"Reset[5]" : [ 0 ],
							"Reset[6]" : [ 0 ],
							"notes" : [ 0, 1, 2, 1, 4, 1, 5, 1, 7, 1, 9, 1, 10, 1 ],
							"notes[1]" : [ 0, 1, 2, 1, 4, 1, 5, 1, 7, 1, 9, 1, 10, 1 ]
						}

					}

				}

			}
,
			"snapshotlist" : 			{
				"current_snapshot" : 3,
				"entries" : [ 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "SOUND",
						"origin" : "SOUND",
						"type" : "patcher",
						"subtype" : "Undefined",
						"embed" : 0,
						"snapshot" : 						{
							"valuedictionary" : 							{
								"parameter_values" : 								{
									"Attack" : 632.455532033675922,
									"Attack[1]" : 632.455532033675922,
									"Attack[2]" : 632.455532033675922,
									"Attack[3]" : 632.455532033675922,
									"Attack[4]" : 632.455532033675922,
									"Attack[5]" : 632.455532033675922,
									"Bypass" : 0.0,
									"Bypass[1]" : 0.0,
									"Bypass[2]" : 0.0,
									"Bypass[3]" : 0.0,
									"Bypass[4]" : 0.0,
									"Bypass[5]" : 0.0,
									"Bypass[6]" : 0.0,
									"Bypass[7]" : 0.0,
									"Bypass[8]" : 0.0,
									"CV" : 0.0,
									"CV1" : 0.0,
									"CV1[1]" : 0.0,
									"CV1[2]" : 0.0,
									"CV1[3]" : 0.0,
									"CV1[4]" : 0.0,
									"CV1[5]" : 0.0,
									"CV2" : 0.0,
									"CV2[10]" : 0.0,
									"CV2[11]" : 0.0,
									"CV2[1]" : 0.0,
									"CV2[2]" : 0.0,
									"CV2[3]" : 0.0,
									"CV2[4]" : 0.0,
									"CV2[5]" : 0.0,
									"CV2[6]" : 0.0,
									"CV2[7]" : 0.0,
									"CV2[8]" : 0.0,
									"CV2[9]" : 0.0,
									"CV3" : 0.0,
									"CV3[10]" : 0.0,
									"CV3[11]" : 0.0,
									"CV3[1]" : 0.0,
									"CV3[2]" : 0.0,
									"CV3[3]" : 0.0,
									"CV3[4]" : 0.0,
									"CV3[5]" : 0.0,
									"CV3[6]" : 0.0,
									"CV3[7]" : 0.0,
									"CV3[8]" : 0.0,
									"CV3[9]" : 0.0,
									"CV[1]" : 0.0,
									"Damp" : 0.7,
									"Damp[1]" : 0.7,
									"Damp[2]" : 0.7,
									"Decay" : 2249.365300761396156,
									"Decay[1]" : 2249.365300761396156,
									"Decay[2]" : 2249.365300761396156,
									"Decay[3]" : 2249.365300761396156,
									"Decay[4]" : 2249.365300761396156,
									"Decay[5]" : 2249.365300761396156,
									"Dry" : 1.0,
									"Dry[1]" : 1.0,
									"Dry[2]" : 1.0,
									"Early" : 0.25,
									"Early[1]" : 0.25,
									"Early[2]" : 0.25,
									"Freq" : 6763.827789816807126,
									"FreqMode" : 1.0,
									"FreqMode[1]" : 1.0,
									"FreqMode[2]" : 1.0,
									"FreqMode[3]" : 1.0,
									"FreqMode[4]" : 1.0,
									"FreqMode[5]" : 1.0,
									"FreqRate[2]" : 10.236219000565489,
									"FreqRate[3]" : 13.907227292758982,
									"FreqRate[4]" : 13.907227292758982,
									"FreqRate[5]" : 10.236219000565489,
									"Freq[10]" : 7886.053977744127224,
									"Freq[11]" : 7886.053977744127224,
									"Freq[1]" : 6763.827789816807126,
									"Freq[2]" : 6763.827789816807126,
									"Freq[3]" : 6763.827789816807126,
									"Freq[4]" : 6763.827789816807126,
									"Freq[5]" : 6763.827789816807126,
									"Freq[6]" : 7886.053977744127224,
									"Freq[7]" : 7886.053977744127224,
									"Freq[8]" : 7886.053977744127224,
									"Freq[9]" : 7886.053977744127224,
									"Frequency[2]" : 31.622776601683793,
									"Frequency[3]" : 31.622776601683793,
									"Frequency[4]" : 31.622776601683793,
									"Gain" : 4.0,
									"Gain[1]" : 4.0,
									"Gain[2]" : 4.0,
									"Gain[3]" : 4.0,
									"Gain[4]" : 4.0,
									"Gain[5]" : 4.0,
									"Hold[1]" : 0.0,
									"Hold[2]" : 0.0,
									"Hold[4]" : 0.0,
									"Hold[5]" : 0.0,
									"Legato" : 0.0,
									"Legato[1]" : 0.0,
									"Legato[2]" : 0.0,
									"Legato[3]" : 0.0,
									"Legato[4]" : 0.0,
									"Legato[5]" : 0.0,
									"Level[1]" : 100.0,
									"Level[2]" : 100.0,
									"Linear" : 0.0,
									"Linear[1]" : 0.0,
									"Linear[2]" : 0.0,
									"Linear[3]" : 0.0,
									"Linear[4]" : 0.0,
									"Linear[5]" : 0.0,
									"Mute" : 0.0,
									"Mute[10]" : 0.0,
									"Mute[11]" : 0.0,
									"Mute[12]" : 0.0,
									"Mute[13]" : 0.0,
									"Mute[15]" : 0.0,
									"Mute[16]" : 0.0,
									"Mute[18]" : 0.0,
									"Mute[19]" : 0.0,
									"Mute[1]" : 0.0,
									"Mute[20]" : 0.0,
									"Mute[2]" : 0.0,
									"Mute[3]" : 0.0,
									"Mute[4]" : 0.0,
									"Mute[5]" : 0.0,
									"Mute[6]" : 0.0,
									"Mute[7]" : 0.0,
									"Mute[8]" : 0.0,
									"Mute[9]" : 0.0,
									"NoiseType" : 0.0,
									"NoiseType[1]" : 0.0,
									"Offset" : 0.0,
									"Offset[1]" : 0.0,
									"Offset[2]" : 0.0,
									"Offset[3]" : 0.0,
									"Offset[4]" : 0.0,
									"Offset[5]" : 0.0,
									"PW" : 50.0,
									"PWM" : 0.0,
									"PWM[1]" : 0.0,
									"PWM[2]" : 0.0,
									"PWM[3]" : 0.0,
									"PWM[4]" : 0.0,
									"PWM[5]" : 0.0,
									"PW[1]" : 50.0,
									"PW[2]" : 50.0,
									"PW[3]" : 50.0,
									"PW[4]" : 50.0,
									"PW[5]" : 50.0,
									"Phase[2]" : 0.0,
									"Phase[3]" : 0.0,
									"Phase[4]" : 0.0,
									"Phase[5]" : 0.0,
									"PulseWidth[3]" : 50.0,
									"PulseWidth[4]" : 50.0,
									"PulseWidth[5]" : 50.0,
									"PulseWidth[6]" : 50.0,
									"PulseWidth[7]" : 50.0,
									"PulseWidth[8]" : 50.0,
									"Quadrants" : 0.0,
									"Quadrants[1]" : 0.0,
									"Quadrants[2]" : 0.0,
									"Quadrants[3]" : 0.0,
									"Quadrants[4]" : 0.0,
									"Quadrants[5]" : 0.0,
									"Re-Trigger[2]" : 0.0,
									"Re-Trigger[3]" : 0.0,
									"Re-Trigger[4]" : 0.0,
									"Re-Trigger[5]" : 0.0,
									"Regen" : 0.5,
									"Regen[1]" : 0.5,
									"Regen[2]" : 0.5,
									"Release" : 2000.0,
									"Release[1]" : 2000.0,
									"Release[2]" : 2000.0,
									"Release[3]" : 2000.0,
									"Release[4]" : 2000.0,
									"Release[5]" : 2000.0,
									"Resonance" : 2.413723461514075,
									"Resonance[1]" : 2.413723461514075,
									"Resonance[2]" : 2.413723461514075,
									"Resonance[3]" : 2.413723461514075,
									"Resonance[4]" : 2.413723461514075,
									"Resonance[5]" : 2.413723461514075,
									"Response" : 0.0,
									"Response[1]" : 0.0,
									"Response[2]" : 0.0,
									"Response[3]" : 0.0,
									"Response[4]" : 0.0,
									"Response[5]" : 0.0,
									"Size" : 149.974981234360769,
									"Size[1]" : 149.974981234360769,
									"Size[2]" : 149.974981234360769,
									"SpectraLFOShape[2]" : 0.0,
									"SpectraLFOShape[3]" : 0.0,
									"Spread" : 23.0,
									"Spread[1]" : 23.0,
									"Spread[2]" : 23.0,
									"Sustain" : 70.0,
									"Sustain[1]" : 70.0,
									"Sustain[2]" : 70.0,
									"Sustain[3]" : 70.0,
									"Sustain[4]" : 70.0,
									"Sustain[5]" : 70.0,
									"SyncRate[2]" : 1.0,
									"SyncRate[3]" : 5.0,
									"SyncRate[4]" : 5.0,
									"SyncRate[5]" : 1.0,
									"Tail" : 0.25,
									"Tail[1]" : 0.25,
									"Tail[2]" : 0.25,
									"Time" : 11715.099855785485488,
									"Time[1]" : 11715.099855785485488,
									"Time[2]" : 11715.099855785485488,
									"Waveform" : 2.0,
									"Waveform[1]" : 2.0,
									"Waveform[2]" : 2.0,
									"Waveform[3]" : 2.0,
									"Waveform[4]" : 2.0,
									"Waveform[5]" : 2.0,
									"bypass" : 0.0,
									"bypass[3]" : 0.0,
									"bypass[4]" : 0.0,
									"bypass[6]" : 0.0,
									"bypass[7]" : 0.0,
									"filter_mode" : 0.0,
									"filter_mode[1]" : 0.0,
									"filter_mode[2]" : 0.0,
									"filter_mode[3]" : 0.0,
									"filter_mode[4]" : 0.0,
									"filter_mode[5]" : 0.0,
									"in1" : 0.0,
									"in2" : -72.0,
									"in3" : -72.0,
									"in4" : -72.0,
									"live.gain~" : -45.398401334326515,
									"live.tab[1]" : 1.0,
									"live.tab[2]" : 1.0,
									"power" : 0.0,
									"power[1]" : 0.0,
									"power[2]" : 0.0,
									"power[3]" : 0.0,
									"power[4]" : 0.0,
									"power[5]" : 0.0,
									"rounding" : 1.0,
									"rounding[1]" : 1.0,
									"score" : 1.0,
									"score[1]" : 1.0,
									"spectral" : 0.0,
									"spectral[1]" : 0.0,
									"spectral[2]" : 0.0,
									"spectral[3]" : 0.0,
									"spectral[4]" : 0.0,
									"spectral[5]" : 0.0,
									"Time Mode[3]" : 0.0,
									"Time Mode[4]" : 1.0,
									"Time Mode[5]" : 1.0,
									"Time Mode[6]" : 1.0,
									"Time Mode[7]" : 0.0,
									"Time Mode[8]" : 1.0,
									"blob" : 									{
										"Reset[3]" : [ 0.0 ],
										"Reset[4]" : [ 0.0 ],
										"Reset[5]" : [ 0.0 ],
										"Reset[6]" : [ 0.0 ],
										"notes" : [ 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10, 1, 11, 1 ],
										"notes[1]" : [ 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10, 1, 11, 1 ]
									}

								}

							}

						}
,
						"fileref" : 						{
							"name" : "SOUND",
							"filename" : "SOUND.maxsnap",
							"filepath" : "~/Documents/Max 8/Snapshots",
							"filepos" : -1,
							"snapshotfileid" : "febd84ac4065de94105028ecbe6b4dba"
						}

					}
, 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "SOUND[1]",
						"origin" : "SOUND",
						"type" : "patcher",
						"subtype" : "Undefined",
						"embed" : 0,
						"snapshot" : 						{
							"valuedictionary" : 							{
								"parameter_values" : 								{
									"Attack" : 632.455532033675922,
									"Attack[1]" : 632.455532033675922,
									"Attack[2]" : 632.455532033675922,
									"Attack[3]" : 632.455532033675922,
									"Attack[4]" : 632.455532033675922,
									"Attack[5]" : 632.455532033675922,
									"Bypass" : 0.0,
									"Bypass[1]" : 0.0,
									"Bypass[2]" : 0.0,
									"Bypass[3]" : 0.0,
									"Bypass[4]" : 0.0,
									"Bypass[5]" : 0.0,
									"Bypass[6]" : 0.0,
									"Bypass[7]" : 0.0,
									"Bypass[8]" : 0.0,
									"CV" : 100.0,
									"CV1" : 100.0,
									"CV1[1]" : 100.0,
									"CV1[2]" : 100.0,
									"CV1[3]" : 100.0,
									"CV1[4]" : 0.0,
									"CV1[5]" : 0.0,
									"CV2" : 100.0,
									"CV2[10]" : 0.0,
									"CV2[11]" : 0.0,
									"CV2[1]" : 100.0,
									"CV2[2]" : 0.0,
									"CV2[3]" : 0.0,
									"CV2[4]" : 0.0,
									"CV2[5]" : 0.0,
									"CV2[6]" : 0.0,
									"CV2[7]" : 0.0,
									"CV2[8]" : 0.0,
									"CV2[9]" : 0.0,
									"CV3" : 0.0,
									"CV3[10]" : 0.0,
									"CV3[11]" : 0.0,
									"CV3[1]" : 0.0,
									"CV3[2]" : 0.0,
									"CV3[3]" : 0.0,
									"CV3[4]" : 0.0,
									"CV3[5]" : 0.0,
									"CV3[6]" : 0.0,
									"CV3[7]" : 0.0,
									"CV3[8]" : 0.0,
									"CV3[9]" : 0.0,
									"CV[1]" : 100.0,
									"Damp" : 0.7,
									"Damp[1]" : 0.7,
									"Damp[2]" : 0.7,
									"Decay" : 2249.365300761396156,
									"Decay[1]" : 2249.365300761396156,
									"Decay[2]" : 2249.365300761396156,
									"Decay[3]" : 2249.365300761396156,
									"Decay[4]" : 2249.365300761396156,
									"Decay[5]" : 2249.365300761396156,
									"Dry" : 1.0,
									"Dry[1]" : 1.0,
									"Dry[2]" : 1.0,
									"Early" : 0.25,
									"Early[1]" : 0.25,
									"Early[2]" : 0.25,
									"Freq" : 6763.827789816807126,
									"FreqMode" : 1.0,
									"FreqMode[1]" : 1.0,
									"FreqMode[2]" : 1.0,
									"FreqMode[3]" : 1.0,
									"FreqMode[4]" : 1.0,
									"FreqMode[5]" : 1.0,
									"FreqRate[2]" : 10.236219000565489,
									"FreqRate[3]" : 13.907227292758982,
									"FreqRate[4]" : 13.907227292758982,
									"FreqRate[5]" : 10.236219000565489,
									"Freq[10]" : 7886.053977744127224,
									"Freq[11]" : 7886.053977744127224,
									"Freq[1]" : 6763.827789816807126,
									"Freq[2]" : 6763.827789816807126,
									"Freq[3]" : 6763.827789816807126,
									"Freq[4]" : 6763.827789816807126,
									"Freq[5]" : 6763.827789816807126,
									"Freq[6]" : 7886.053977744127224,
									"Freq[7]" : 7886.053977744127224,
									"Freq[8]" : 7886.053977744127224,
									"Freq[9]" : 7886.053977744127224,
									"Frequency[2]" : 31.622776601683793,
									"Frequency[3]" : 31.622776601683793,
									"Frequency[4]" : 31.622776601683793,
									"Gain" : 4.0,
									"Gain[1]" : 4.0,
									"Gain[2]" : 4.0,
									"Gain[3]" : 4.0,
									"Gain[4]" : 4.0,
									"Gain[5]" : 4.0,
									"Hold[1]" : 0.0,
									"Hold[2]" : 0.0,
									"Hold[4]" : 0.0,
									"Hold[5]" : 0.0,
									"Legato" : 0.0,
									"Legato[1]" : 0.0,
									"Legato[2]" : 0.0,
									"Legato[3]" : 0.0,
									"Legato[4]" : 0.0,
									"Legato[5]" : 0.0,
									"Level[1]" : 100.0,
									"Level[2]" : 100.0,
									"Linear" : 0.0,
									"Linear[1]" : 0.0,
									"Linear[2]" : 0.0,
									"Linear[3]" : 0.0,
									"Linear[4]" : 0.0,
									"Linear[5]" : 0.0,
									"Mute" : 0.0,
									"Mute[10]" : 0.0,
									"Mute[11]" : 0.0,
									"Mute[12]" : 0.0,
									"Mute[13]" : 0.0,
									"Mute[15]" : 0.0,
									"Mute[16]" : 0.0,
									"Mute[18]" : 0.0,
									"Mute[19]" : 0.0,
									"Mute[1]" : 0.0,
									"Mute[20]" : 0.0,
									"Mute[2]" : 0.0,
									"Mute[3]" : 0.0,
									"Mute[4]" : 0.0,
									"Mute[5]" : 0.0,
									"Mute[6]" : 0.0,
									"Mute[7]" : 0.0,
									"Mute[8]" : 0.0,
									"Mute[9]" : 0.0,
									"NoiseType" : 0.0,
									"NoiseType[1]" : 0.0,
									"Offset" : 0.0,
									"Offset[1]" : 0.0,
									"Offset[2]" : 0.0,
									"Offset[3]" : 0.0,
									"Offset[4]" : 0.0,
									"Offset[5]" : 0.0,
									"PW" : 50.0,
									"PWM" : 0.0,
									"PWM[1]" : 0.0,
									"PWM[2]" : 0.0,
									"PWM[3]" : 0.0,
									"PWM[4]" : 0.0,
									"PWM[5]" : 0.0,
									"PW[1]" : 50.0,
									"PW[2]" : 50.0,
									"PW[3]" : 50.0,
									"PW[4]" : 50.0,
									"PW[5]" : 50.0,
									"Phase[2]" : 0.0,
									"Phase[3]" : 0.0,
									"Phase[4]" : 0.0,
									"Phase[5]" : 0.0,
									"PulseWidth[3]" : 50.0,
									"PulseWidth[4]" : 50.0,
									"PulseWidth[5]" : 50.0,
									"PulseWidth[6]" : 50.0,
									"PulseWidth[7]" : 50.0,
									"PulseWidth[8]" : 50.0,
									"Quadrants" : 0.0,
									"Quadrants[1]" : 0.0,
									"Quadrants[2]" : 0.0,
									"Quadrants[3]" : 0.0,
									"Quadrants[4]" : 0.0,
									"Quadrants[5]" : 0.0,
									"Re-Trigger[2]" : 0.0,
									"Re-Trigger[3]" : 0.0,
									"Re-Trigger[4]" : 0.0,
									"Re-Trigger[5]" : 0.0,
									"Regen" : 0.5,
									"Regen[1]" : 0.5,
									"Regen[2]" : 0.5,
									"Release" : 2000.0,
									"Release[1]" : 2000.0,
									"Release[2]" : 2000.0,
									"Release[3]" : 2000.0,
									"Release[4]" : 2000.0,
									"Release[5]" : 2000.0,
									"Resonance" : 2.413723461514075,
									"Resonance[1]" : 7.138132910333003,
									"Resonance[2]" : 7.925534485136142,
									"Resonance[3]" : 2.413723461514075,
									"Resonance[4]" : 2.413723461514075,
									"Resonance[5]" : 2.413723461514075,
									"Response" : 0.0,
									"Response[1]" : 0.0,
									"Response[2]" : 0.0,
									"Response[3]" : 0.0,
									"Response[4]" : 0.0,
									"Response[5]" : 0.0,
									"Size" : 149.974981234360769,
									"Size[1]" : 149.974981234360769,
									"Size[2]" : 149.974981234360769,
									"SpectraLFOShape[2]" : 0.0,
									"SpectraLFOShape[3]" : 0.0,
									"Spread" : 23.0,
									"Spread[1]" : 23.0,
									"Spread[2]" : 23.0,
									"Sustain" : 70.0,
									"Sustain[1]" : 70.0,
									"Sustain[2]" : 70.0,
									"Sustain[3]" : 70.0,
									"Sustain[4]" : 70.0,
									"Sustain[5]" : 70.0,
									"SyncRate[2]" : 1.0,
									"SyncRate[3]" : 5.0,
									"SyncRate[4]" : 5.0,
									"SyncRate[5]" : 1.0,
									"Tail" : 0.25,
									"Tail[1]" : 0.25,
									"Tail[2]" : 0.25,
									"Time" : 11715.099855785485488,
									"Time[1]" : 11715.099855785485488,
									"Time[2]" : 11715.099855785485488,
									"Waveform" : 0.0,
									"Waveform[1]" : 0.0,
									"Waveform[2]" : 2.0,
									"Waveform[3]" : 2.0,
									"Waveform[4]" : 2.0,
									"Waveform[5]" : 2.0,
									"bypass" : 0.0,
									"bypass[3]" : 0.0,
									"bypass[4]" : 0.0,
									"bypass[6]" : 0.0,
									"bypass[7]" : 0.0,
									"filter_mode" : 0.0,
									"filter_mode[1]" : 0.0,
									"filter_mode[2]" : 0.0,
									"filter_mode[3]" : 0.0,
									"filter_mode[4]" : 0.0,
									"filter_mode[5]" : 0.0,
									"in1" : 0.0,
									"in2" : -72.0,
									"in3" : -72.0,
									"in4" : -72.0,
									"live.gain~" : -45.398401334326515,
									"live.tab[1]" : 1.0,
									"live.tab[2]" : 1.0,
									"power" : 0.0,
									"power[1]" : 0.0,
									"power[2]" : 0.0,
									"power[3]" : 0.0,
									"power[4]" : 0.0,
									"power[5]" : 0.0,
									"rounding" : 0.0,
									"rounding[1]" : 0.0,
									"score" : 1.0,
									"score[1]" : 1.0,
									"spectral" : 0.0,
									"spectral[1]" : 0.0,
									"spectral[2]" : 0.0,
									"spectral[3]" : 0.0,
									"spectral[4]" : 0.0,
									"spectral[5]" : 0.0,
									"Time Mode[3]" : 0.0,
									"Time Mode[4]" : 1.0,
									"Time Mode[5]" : 1.0,
									"Time Mode[6]" : 1.0,
									"Time Mode[7]" : 0.0,
									"Time Mode[8]" : 1.0,
									"blob" : 									{
										"Reset[3]" : [ 0.0 ],
										"Reset[4]" : [ 0.0 ],
										"Reset[5]" : [ 0.0 ],
										"Reset[6]" : [ 0.0 ],
										"notes" : [ 2, 1, 4, 1, 7, 1, 9, 1, 11, 1 ],
										"notes[1]" : [ 2, 1, 4, 1, 7, 1, 9, 1, 11, 1 ]
									}

								}

							}

						}
,
						"fileref" : 						{
							"name" : "SOUND[1]",
							"filename" : "SOUND[1].maxsnap",
							"filepath" : "~/Documents/Max 8/Snapshots",
							"filepos" : -1,
							"snapshotfileid" : "62d0f0e62c41f93941b4957eedbfb77c"
						}

					}
, 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "SOUND[2]",
						"origin" : "SOUND",
						"type" : "patcher",
						"subtype" : "Undefined",
						"embed" : 0,
						"snapshot" : 						{
							"valuedictionary" : 							{
								"parameter_values" : 								{
									"Attack" : 632.455532033675922,
									"Attack[1]" : 2459.22718557698181,
									"Attack[2]" : 632.455532033675922,
									"Attack[3]" : 1889.763779527557972,
									"Attack[4]" : 632.455532033675922,
									"Attack[5]" : 632.455532033675922,
									"Bypass" : 0.0,
									"Bypass[1]" : 0.0,
									"Bypass[2]" : 0.0,
									"Bypass[3]" : 0.0,
									"Bypass[4]" : 0.0,
									"Bypass[5]" : 0.0,
									"Bypass[6]" : 0.0,
									"Bypass[7]" : 0.0,
									"Bypass[8]" : 0.0,
									"CV" : 0.4,
									"CV1" : 100.0,
									"CV1[1]" : 100.0,
									"CV1[2]" : 100.0,
									"CV1[3]" : 100.0,
									"CV1[4]" : 100.0,
									"CV1[5]" : 100.0,
									"CV2" : 100.0,
									"CV2[10]" : 0.0,
									"CV2[11]" : 0.0,
									"CV2[1]" : 100.0,
									"CV2[2]" : 0.0,
									"CV2[3]" : 0.0,
									"CV2[4]" : 0.0,
									"CV2[5]" : 0.0,
									"CV2[6]" : 0.0,
									"CV2[7]" : 0.0,
									"CV2[8]" : 0.0,
									"CV2[9]" : 0.0,
									"CV3" : 0.0,
									"CV3[10]" : 0.0,
									"CV3[11]" : 0.0,
									"CV3[1]" : 0.0,
									"CV3[2]" : 0.0,
									"CV3[3]" : 0.0,
									"CV3[4]" : 0.0,
									"CV3[5]" : 0.0,
									"CV3[6]" : 0.0,
									"CV3[7]" : 0.0,
									"CV3[8]" : 0.0,
									"CV3[9]" : 0.0,
									"CV[1]" : 0.4,
									"Damp" : 0.7,
									"Damp[1]" : 0.7,
									"Damp[2]" : 0.7,
									"Decay" : 2249.365300761396156,
									"Decay[1]" : 2249.365300761396156,
									"Decay[2]" : 2249.365300761396156,
									"Decay[3]" : 2078.740157480312973,
									"Decay[4]" : 2249.365300761396156,
									"Decay[5]" : 2249.365300761396156,
									"Dry" : 1.0,
									"Dry[1]" : 1.0,
									"Dry[2]" : 1.0,
									"Early" : 0.25,
									"Early[1]" : 0.25,
									"Early[2]" : 0.25,
									"Freq" : 6763.827789816807126,
									"FreqMode" : 1.0,
									"FreqMode[1]" : 1.0,
									"FreqMode[2]" : 1.0,
									"FreqMode[3]" : 1.0,
									"FreqMode[4]" : 1.0,
									"FreqMode[5]" : 1.0,
									"FreqRate[2]" : 7.401573331274154,
									"FreqRate[3]" : 10.127699733703873,
									"FreqRate[4]" : 13.907227292758982,
									"FreqRate[5]" : 10.236219000565489,
									"Freq[10]" : 7886.053977744127224,
									"Freq[11]" : 7886.053977744127224,
									"Freq[1]" : 6763.827789816807126,
									"Freq[2]" : 6763.827789816807126,
									"Freq[3]" : 6763.827789816807126,
									"Freq[4]" : 6763.827789816807126,
									"Freq[5]" : 6763.827789816807126,
									"Freq[6]" : 7886.053977744127224,
									"Freq[7]" : 8829.990985618142076,
									"Freq[8]" : 6155.590551181124283,
									"Freq[9]" : 7886.053977744127224,
									"Frequency[3]" : 10.362934081998777,
									"Frequency[4]" : 9.575532507195625,
									"Gain" : 4.0,
									"Gain[1]" : 4.0,
									"Gain[2]" : 4.0,
									"Gain[3]" : 4.0,
									"Gain[4]" : 4.0,
									"Gain[5]" : 4.0,
									"Hold[1]" : 0.0,
									"Hold[2]" : 0.0,
									"Hold[4]" : 0.0,
									"Hold[5]" : 0.0,
									"Legato" : 0.0,
									"Legato[1]" : 0.0,
									"Legato[2]" : 0.0,
									"Legato[3]" : 0.0,
									"Legato[4]" : 0.0,
									"Legato[5]" : 0.0,
									"Level[1]" : 100.0,
									"Level[2]" : 100.0,
									"Linear" : 0.0,
									"Linear[1]" : 0.0,
									"Linear[2]" : 0.0,
									"Linear[3]" : 0.0,
									"Linear[4]" : 0.0,
									"Linear[5]" : 0.0,
									"Mute" : 0.0,
									"Mute[10]" : 0.0,
									"Mute[11]" : 0.0,
									"Mute[12]" : 0.0,
									"Mute[13]" : 0.0,
									"Mute[15]" : 0.0,
									"Mute[16]" : 0.0,
									"Mute[19]" : 0.0,
									"Mute[1]" : 0.0,
									"Mute[20]" : 0.0,
									"Mute[2]" : 0.0,
									"Mute[3]" : 0.0,
									"Mute[4]" : 0.0,
									"Mute[5]" : 0.0,
									"Mute[6]" : 0.0,
									"Mute[7]" : 0.0,
									"Mute[8]" : 0.0,
									"Mute[9]" : 0.0,
									"NoiseType" : 0.0,
									"NoiseType[1]" : 0.0,
									"Offset" : 0.0,
									"Offset[1]" : 0.0,
									"Offset[2]" : 0.0,
									"Offset[3]" : 0.0,
									"Offset[4]" : 0.0,
									"Offset[5]" : 0.0,
									"PW" : 50.0,
									"PWM" : 0.0,
									"PWM[1]" : 0.0,
									"PWM[2]" : 0.0,
									"PWM[3]" : 0.0,
									"PWM[4]" : 0.0,
									"PWM[5]" : 0.0,
									"PW[1]" : 50.0,
									"PW[2]" : 50.0,
									"PW[3]" : 50.0,
									"PW[4]" : 50.0,
									"PW[5]" : 50.0,
									"Phase[2]" : 0.0,
									"Phase[3]" : 0.0,
									"Phase[4]" : 0.0,
									"Phase[5]" : 0.0,
									"PulseWidth[3]" : 50.0,
									"PulseWidth[4]" : 50.0,
									"PulseWidth[5]" : 50.0,
									"PulseWidth[6]" : 50.0,
									"PulseWidth[7]" : 50.0,
									"PulseWidth[8]" : 50.0,
									"Quadrants" : 0.0,
									"Quadrants[1]" : 0.0,
									"Quadrants[2]" : 0.0,
									"Quadrants[3]" : 0.0,
									"Quadrants[4]" : 0.0,
									"Quadrants[5]" : 0.0,
									"Re-Trigger[2]" : 0.0,
									"Re-Trigger[3]" : 0.0,
									"Re-Trigger[4]" : 0.0,
									"Re-Trigger[5]" : 0.0,
									"Regen" : 0.5,
									"Regen[1]" : 0.5,
									"Regen[2]" : 0.5,
									"Release" : 2000.0,
									"Release[1]" : 6913.385826771655047,
									"Release[2]" : 2000.0,
									"Release[3]" : 7559.055118110238254,
									"Release[4]" : 2000.0,
									"Release[5]" : 2000.0,
									"Resonance" : 6.941282516632191,
									"Resonance[1]" : 12.256243146553478,
									"Resonance[2]" : 12.846794327655839,
									"Resonance[3]" : 7.531833697734553,
									"Resonance[4]" : 6.941282516632191,
									"Resonance[5]" : 6.153880941829055,
									"Response" : 0.0,
									"Response[1]" : 0.0,
									"Response[2]" : 0.0,
									"Response[3]" : 0.0,
									"Response[4]" : 0.0,
									"Response[5]" : 0.0,
									"Signal" : 49.606299212598458,
									"Signal[1]" : 49.606299212598437,
									"Size" : 149.974981234360769,
									"Size[1]" : 149.974981234360769,
									"Size[2]" : 149.974981234360769,
									"SpectraLFOShape[2]" : 4.0,
									"SpectraLFOShape[3]" : 4.0,
									"Spread" : 23.0,
									"Spread[1]" : 23.0,
									"Spread[2]" : 23.0,
									"Sustain" : 70.0,
									"Sustain[1]" : 70.0,
									"Sustain[2]" : 70.0,
									"Sustain[3]" : 6.299212598425247,
									"Sustain[4]" : 70.0,
									"Sustain[5]" : 70.0,
									"SyncRate[2]" : 1.0,
									"SyncRate[3]" : 5.0,
									"SyncRate[4]" : 5.0,
									"SyncRate[5]" : 1.0,
									"Tail" : 0.25,
									"Tail[1]" : 0.25,
									"Tail[2]" : 0.25,
									"Time" : 11715.099855785485488,
									"Time[1]" : 11715.099855785485488,
									"Time[2]" : 11715.099855785485488,
									"Waveform" : 0.0,
									"Waveform[1]" : 0.0,
									"Waveform[2]" : 0.0,
									"Waveform[3]" : 0.0,
									"Waveform[4]" : 0.0,
									"Waveform[5]" : 0.0,
									"bypass" : 0.0,
									"bypass[3]" : 0.0,
									"bypass[4]" : 0.0,
									"bypass[5]" : 0.0,
									"bypass[6]" : 0.0,
									"bypass[7]" : 0.0,
									"bypass[8]" : 0.0,
									"filter_mode" : 0.0,
									"filter_mode[1]" : 0.0,
									"filter_mode[2]" : 0.0,
									"filter_mode[3]" : 0.0,
									"filter_mode[4]" : 0.0,
									"filter_mode[5]" : 0.0,
									"in1" : -0.566929133858267,
									"in2" : -14.173228346456682,
									"in3" : -72.0,
									"in4" : -72.0,
									"live.gain~" : -45.398401334326515,
									"live.tab[1]" : 1.0,
									"live.tab[2]" : 1.0,
									"power" : 0.0,
									"power[1]" : 0.0,
									"power[2]" : 0.0,
									"power[3]" : 0.0,
									"power[4]" : 0.0,
									"power[5]" : 0.0,
									"rounding" : 0.0,
									"rounding[1]" : 0.0,
									"score" : 1.0,
									"score[1]" : 1.0,
									"spectral" : 0.0,
									"spectral[1]" : 0.0,
									"spectral[2]" : 0.0,
									"spectral[3]" : 0.0,
									"spectral[4]" : 0.0,
									"spectral[5]" : 0.0,
									"Time Mode[3]" : 0.0,
									"Time Mode[4]" : 1.0,
									"Time Mode[5]" : 1.0,
									"Time Mode[6]" : 1.0,
									"Time Mode[7]" : 0.0,
									"Time Mode[8]" : 1.0,
									"blob" : 									{
										"Reset[3]" : [ 0.0 ],
										"Reset[4]" : [ 0.0 ],
										"Reset[5]" : [ 0.0 ],
										"Reset[6]" : [ 0.0 ],
										"notes" : [ 2, 1, 4, 1, 7, 1, 9, 1, 11, 1 ],
										"notes[1]" : [ 2, 1, 4, 1, 7, 1, 9, 1, 11, 1 ]
									}

								}

							}

						}
,
						"fileref" : 						{
							"name" : "SOUND[2]",
							"filename" : "SOUND[2].maxsnap",
							"filepath" : "~/Documents/Max 8/Snapshots",
							"filepos" : -1,
							"snapshotfileid" : "9e50d25463ea91dd5063c87d9ca51b72"
						}

					}
, 					{
						"filetype" : "C74Snapshot",
						"version" : 2,
						"minorversion" : 0,
						"name" : "SOUND[3]",
						"origin" : "SOUND",
						"type" : "patcher",
						"subtype" : "Undefined",
						"embed" : 0,
						"snapshot" : 						{
							"valuedictionary" : 							{
								"parameter_values" : 								{
									"Attack" : 632.455532033675922,
									"Attack[1]" : 632.455532033675922,
									"Attack[2]" : 632.455532033675922,
									"Attack[3]" : 632.455532033675922,
									"Attack[4]" : 632.455532033675922,
									"Attack[5]" : 632.455532033675922,
									"Bypass" : 0.0,
									"Bypass[1]" : 0.0,
									"Bypass[2]" : 0.0,
									"Bypass[3]" : 0.0,
									"Bypass[4]" : 0.0,
									"Bypass[5]" : 0.0,
									"Bypass[6]" : 0.0,
									"Bypass[7]" : 0.0,
									"Bypass[8]" : 0.0,
									"CV" : 0.4,
									"CV1" : 100.0,
									"CV1[1]" : 100.0,
									"CV1[2]" : 100.0,
									"CV1[3]" : 100.0,
									"CV1[4]" : 0.0,
									"CV1[5]" : 0.0,
									"CV2" : 100.0,
									"CV2[10]" : 0.0,
									"CV2[11]" : 0.0,
									"CV2[1]" : 100.0,
									"CV2[2]" : 0.0,
									"CV2[3]" : 0.0,
									"CV2[4]" : 0.0,
									"CV2[5]" : 0.0,
									"CV2[6]" : 0.0,
									"CV2[7]" : 0.0,
									"CV2[8]" : 0.0,
									"CV2[9]" : 0.0,
									"CV3" : 0.0,
									"CV3[10]" : 0.0,
									"CV3[11]" : 0.0,
									"CV3[1]" : 0.0,
									"CV3[2]" : 0.0,
									"CV3[3]" : 0.0,
									"CV3[4]" : 0.0,
									"CV3[5]" : 0.0,
									"CV3[6]" : 0.0,
									"CV3[7]" : 0.0,
									"CV3[8]" : 0.0,
									"CV3[9]" : 0.0,
									"CV[1]" : 0.4,
									"Damp" : 0.7,
									"Damp[1]" : 0.7,
									"Damp[2]" : 0.7,
									"Decay" : 2249.365300761396156,
									"Decay[1]" : 2249.365300761396156,
									"Decay[2]" : 2249.365300761396156,
									"Decay[3]" : 2249.365300761396156,
									"Decay[4]" : 2249.365300761396156,
									"Decay[5]" : 2249.365300761396156,
									"Dry" : 1.0,
									"Dry[1]" : 1.0,
									"Dry[2]" : 1.0,
									"Early" : 0.25,
									"Early[1]" : 0.25,
									"Early[2]" : 0.25,
									"Freq" : 6763.827789816807126,
									"FreqMode" : 1.0,
									"FreqMode[1]" : 1.0,
									"FreqMode[2]" : 1.0,
									"FreqMode[3]" : 1.0,
									"FreqMode[4]" : 1.0,
									"FreqMode[5]" : 1.0,
									"FreqRate[2]" : 10.236219000565489,
									"FreqRate[3]" : 13.907227292758982,
									"FreqRate[4]" : 13.907227292758982,
									"FreqRate[5]" : 10.236219000565489,
									"Freq[10]" : 7886.053977744127224,
									"Freq[11]" : 7886.053977744127224,
									"Freq[1]" : 6763.827789816807126,
									"Freq[2]" : 6763.827789816807126,
									"Freq[3]" : 6763.827789816807126,
									"Freq[4]" : 6763.827789816807126,
									"Freq[5]" : 6763.827789816807126,
									"Freq[6]" : 7886.053977744127224,
									"Freq[7]" : 7886.053977744127224,
									"Freq[8]" : 7886.053977744127224,
									"Freq[9]" : 7886.053977744127224,
									"Frequency[3]" : 21.515607393584318,
									"Frequency[4]" : 12.066788495946563,
									"Gain" : 4.0,
									"Gain[1]" : 4.0,
									"Gain[2]" : 4.0,
									"Gain[3]" : 4.0,
									"Gain[4]" : 4.0,
									"Gain[5]" : 4.0,
									"Hold[1]" : 0.0,
									"Hold[2]" : 0.0,
									"Hold[4]" : 0.0,
									"Hold[5]" : 0.0,
									"Legato" : 0.0,
									"Legato[1]" : 0.0,
									"Legato[2]" : 0.0,
									"Legato[3]" : 0.0,
									"Legato[4]" : 0.0,
									"Legato[5]" : 0.0,
									"Level[1]" : 100.0,
									"Level[2]" : 100.0,
									"Linear" : 0.0,
									"Linear[1]" : 0.0,
									"Linear[2]" : 0.0,
									"Linear[3]" : 0.0,
									"Linear[4]" : 0.0,
									"Linear[5]" : 0.0,
									"Mute" : 0.0,
									"Mute[10]" : 0.0,
									"Mute[11]" : 0.0,
									"Mute[12]" : 0.0,
									"Mute[13]" : 0.0,
									"Mute[15]" : 0.0,
									"Mute[16]" : 0.0,
									"Mute[19]" : 0.0,
									"Mute[1]" : 0.0,
									"Mute[20]" : 0.0,
									"Mute[2]" : 0.0,
									"Mute[3]" : 0.0,
									"Mute[4]" : 0.0,
									"Mute[5]" : 0.0,
									"Mute[6]" : 0.0,
									"Mute[7]" : 0.0,
									"Mute[8]" : 0.0,
									"Mute[9]" : 0.0,
									"NoiseType" : 0.0,
									"NoiseType[1]" : 0.0,
									"Offset" : 0.0,
									"Offset[1]" : 0.0,
									"Offset[2]" : 0.0,
									"Offset[3]" : 0.0,
									"Offset[4]" : 0.0,
									"Offset[5]" : 0.0,
									"PW" : 50.0,
									"PWM" : 0.0,
									"PWM[1]" : 0.0,
									"PWM[2]" : 0.0,
									"PWM[3]" : 0.0,
									"PWM[4]" : 0.0,
									"PWM[5]" : 0.0,
									"PW[1]" : 50.0,
									"PW[2]" : 50.0,
									"PW[3]" : 50.0,
									"PW[4]" : 50.0,
									"PW[5]" : 50.0,
									"Phase[2]" : 0.0,
									"Phase[3]" : 0.0,
									"Phase[4]" : 0.0,
									"Phase[5]" : 0.0,
									"PulseWidth[3]" : 50.0,
									"PulseWidth[4]" : 50.0,
									"PulseWidth[5]" : 50.0,
									"PulseWidth[6]" : 50.0,
									"PulseWidth[7]" : 50.0,
									"PulseWidth[8]" : 50.0,
									"Quadrants" : 0.0,
									"Quadrants[1]" : 0.0,
									"Quadrants[2]" : 0.0,
									"Quadrants[3]" : 0.0,
									"Quadrants[4]" : 0.0,
									"Quadrants[5]" : 0.0,
									"Re-Trigger[2]" : 0.0,
									"Re-Trigger[3]" : 0.0,
									"Re-Trigger[4]" : 0.0,
									"Re-Trigger[5]" : 0.0,
									"Regen" : 0.5,
									"Regen[1]" : 0.5,
									"Regen[2]" : 0.5,
									"Release" : 2000.0,
									"Release[1]" : 2000.0,
									"Release[2]" : 2000.0,
									"Release[3]" : 2000.0,
									"Release[4]" : 2000.0,
									"Release[5]" : 2000.0,
									"Resonance" : 2.413723461514075,
									"Resonance[1]" : 7.138132910333003,
									"Resonance[2]" : 7.925534485136142,
									"Resonance[3]" : 2.413723461514075,
									"Resonance[4]" : 2.413723461514075,
									"Resonance[5]" : 2.413723461514075,
									"Response" : 0.0,
									"Response[1]" : 0.0,
									"Response[2]" : 0.0,
									"Response[3]" : 0.0,
									"Response[4]" : 0.0,
									"Response[5]" : 0.0,
									"Signal" : 44.094488188976349,
									"Signal[1]" : 68.503937007873958,
									"Size" : 149.974981234360769,
									"Size[1]" : 149.974981234360769,
									"Size[2]" : 149.974981234360769,
									"SpectraLFOShape[2]" : 4.0,
									"SpectraLFOShape[3]" : 4.0,
									"Spread" : 23.0,
									"Spread[1]" : 23.0,
									"Spread[2]" : 23.0,
									"Sustain" : 70.0,
									"Sustain[1]" : 70.0,
									"Sustain[2]" : 70.0,
									"Sustain[3]" : 70.0,
									"Sustain[4]" : 70.0,
									"Sustain[5]" : 70.0,
									"SyncRate[2]" : 1.0,
									"SyncRate[3]" : 5.0,
									"SyncRate[4]" : 5.0,
									"SyncRate[5]" : 1.0,
									"Tail" : 0.25,
									"Tail[1]" : 0.25,
									"Tail[2]" : 0.25,
									"Time" : 11715.099855785485488,
									"Time[1]" : 11715.099855785485488,
									"Time[2]" : 11715.099855785485488,
									"Waveform" : 0.0,
									"Waveform[1]" : 0.0,
									"Waveform[2]" : 2.0,
									"Waveform[3]" : 2.0,
									"Waveform[4]" : 2.0,
									"Waveform[5]" : 2.0,
									"bypass" : 0.0,
									"bypass[3]" : 0.0,
									"bypass[4]" : 0.0,
									"bypass[5]" : 0.0,
									"bypass[6]" : 0.0,
									"bypass[7]" : 0.0,
									"bypass[8]" : 0.0,
									"filter_mode" : 0.0,
									"filter_mode[1]" : 0.0,
									"filter_mode[2]" : 0.0,
									"filter_mode[3]" : 0.0,
									"filter_mode[4]" : 0.0,
									"filter_mode[5]" : 0.0,
									"in1" : 0.0,
									"in2" : -72.0,
									"in3" : -72.0,
									"in4" : -72.0,
									"live.gain~" : -36.815554663213561,
									"live.tab[1]" : 1.0,
									"live.tab[2]" : 1.0,
									"power" : 0.0,
									"power[1]" : 0.0,
									"power[2]" : 0.0,
									"power[3]" : 0.0,
									"power[4]" : 0.0,
									"power[5]" : 0.0,
									"rounding" : 0.0,
									"rounding[1]" : 0.0,
									"score" : 1.0,
									"score[1]" : 1.0,
									"spectral" : 0.0,
									"spectral[1]" : 0.0,
									"spectral[2]" : 0.0,
									"spectral[3]" : 0.0,
									"spectral[4]" : 0.0,
									"spectral[5]" : 0.0,
									"Time Mode[3]" : 0.0,
									"Time Mode[4]" : 1.0,
									"Time Mode[5]" : 1.0,
									"Time Mode[6]" : 1.0,
									"Time Mode[7]" : 0.0,
									"Time Mode[8]" : 1.0,
									"blob" : 									{
										"Reset[3]" : [ 0 ],
										"Reset[4]" : [ 0 ],
										"Reset[5]" : [ 0 ],
										"Reset[6]" : [ 0 ],
										"notes" : [ 0, 1, 2, 1, 4, 1, 5, 1, 7, 1, 9, 1, 10, 1 ],
										"notes[1]" : [ 0, 1, 2, 1, 4, 1, 5, 1, 7, 1, 9, 1, 10, 1 ]
									}

								}

							}

						}
,
						"fileref" : 						{
							"name" : "SOUND[3]",
							"filename" : "SOUND[3].maxsnap",
							"filepath" : "~/Documents/Max 8/Snapshots",
							"filepos" : -1,
							"snapshotfileid" : "de390e59e72c60fd1b4b4b14fdd6ad9e"
						}

					}
 ]
			}

		}

	}

}
