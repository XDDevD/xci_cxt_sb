
        $(document).ready(function () {
            Array.prototype.randomElement = function () {
                return this[Math.floor(Math.random() * this.length)]
            }
            var quotes = [
                {
                    quote: "If you build something looks stupid, and it's works cool.... then that is not stupid.",
                    author:"Somebody"
                },
                {
                    quote:"The difference between stupidity and genius is that genius has its limits.",
                    author:"Albert Einstien"
                },
                {
                    quote: "The only source of knowledge is experience.",
                    author: "Albert Einstien"
                },
                {
                    quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
                    author: "Albert Einstien"
                },
                {
                    quote: "Logic will get you from A to B. Imagination will take you everywhere.",
                    author: "Albert Einstien"
                },
                {
                    quote: "Everyone should be respected as an individual, but no one idolized.",
                    author: "Albert Einstien"
                },
                {
                    quote: "I have no special talent. I am only passionately curious.",
                    author: "Albert Einstien"
                },
                {
                    quote: "A person who never made a mistake never tried anything new.",
                    author: "Albert Einstien"
                },
                {
                    quote: "It is the supreme art of the teacher to awaken joy in creative expression and knowledge.",
                    author: "Albert Einstien"
                }
            ];
            var escapes = [
                {
                    patterrn: "\\this",
                    value: "\\this",
                    description:"Each array value"
                },
                {
                    patterrn: "\\nbsp",
                    value: " ",
                    description:"Non-breakable Space"
                },
                {
                    patterrn: "\\n",
                    value: '\n',
                    description: "New Line[LF]"
                },
                {
                    patterrn: "\\r",
                    value: '\r',
                    description: "New Line[CR]"
                },
                {
                    patterrn: "\\r\\n",
                    value: '\r\n',
                    description: "New Line[CR LF]"
                },
                {
                    patterrn: "\\t",
                    value: '\t',
                    description: "a Tab"
                },
                {
                    patterrn: "\\b",
                    value: '\b',
                    description: "backspace"
                },
                {
                    patterrn: "\\\\",
                    value: '\\',
                    description: "backslah"
                },
                {
                    patterrn: "\\\'",
                    value: '\'',
                    description: "apostrophy"
                },
                {
                    patterrn: "\\\"",
                    value: '\"',
                    description: "Double Quote"
                }
            ];
            var cases = [
                {
                    id: "-1",
                    name: "SELECT",
                    defaultEachLinePrefix: "",
                    defaultEachLineSuffix: "",
                    defaultWholeDocPrefix: "",
                    defaultWholeDocSuffix: "",
                    trimm: false,
                    splitter: ''
                },
                {
                    id: "ArrayToCsharpClassProperties",
                    name: "Array To C# Class Properties",
                    defaultEachLinePrefix: "\n\tpublic string ",
                    defaultEachLineSuffix: " { get; set; } ",
                    defaultWholeDocPrefix: "public Class CLassName\n{ ",
                    defaultWholeDocSuffix: "\n} ",
                    trimm: true,
                    splitter: ','
                },
                {
                    id: "ArrayToJSONProperties",
                    name: "Array To JSON Properties",
                    defaultEachLinePrefix: "\nobj.",
                    defaultEachLineSuffix: " = \"Value\";",
                    defaultWholeDocPrefix: "var obj={}",
                    defaultWholeDocSuffix: "\n",
                    trimm: true,
                    splitter: ','
                },
                {
                    id: "ArrayToSetJqueryValue",
                    name: "Array To Get Jquery Values, Set To Object",
                    defaultEachLinePrefix: "\nobj.",
                    defaultEachLineSuffix: " = $(\"#\\this\").val();",
                    defaultWholeDocPrefix: "var obj = {};",
                    defaultWholeDocSuffix: "\\n",
                    trimm: true,
                    splitter: ','
                },
                {
                    id: "ArrayToCsharpSQLParam",
                    name: "Array To C# SQL Parameter",
                    // defaultEachLinePrefix: "\ncmd.Parameters.Add(new SqlParameter()\n\t{\n\t\tParameterName = \"@",
                    defaultEachLinePrefix: "\ncmd.Parameters.AddWithValue(\"@",
                    defaultEachLineSuffix: "\",Obj.\\this);",
                    defaultWholeDocPrefix: "",
                    defaultWholeDocSuffix: "",
                    trimm: true,
                    splitter: ','
                },
                {
                    id: "ArrayToCsharpReaderTObject",
                    name: "Array To  Set C# Object From SQL Reader",
                    defaultEachLinePrefix: "\nobj.",
                    defaultEachLineSuffix: "=rdr[\"\\this\"].ToString();",
                    defaultWholeDocPrefix: "",
                    defaultWholeDocSuffix: "",
                    trimm: true,
                    splitter: ','
                },
                {
                    id: "ArrayToMSSQLSingleFieldInsertSQL",
                    name: "Array To  sqlServer Single Column Insert SQL",
                    defaultEachLinePrefix: " ,",
                    defaultEachLineSuffix: "",
                    defaultWholeDocPrefix: "\nINSERT INTO [Table]([ColumnName]) Values(\"",
                    defaultWholeDocSuffix: "\");",
                    trimm: true,
                    splitter: ','
                }
            ];


            window.quotes = quotes;
            window.cases = cases;
            window.escapes = escapes;

            ////////////////
            quoteIt(quotes);
            var to1 = setInterval(function () {
                quoteIt(quotes);
            },9000)
            ShowEscapes(escapes);
            populateSelect($("#Chosen"), cases);

            function quoteIt(q) {
                var qt = {};
                $("p.quoteCode").hide()

                qt=q.randomElement();
                //qt = q[0];
                $("#quote").attr('q',qt.quote);
                $("#author").attr('a', qt.author);
                $("p.quoteCode").show();//.animate('slow');
            }
            function ShowEscapes(e) {
                $("#escapSeqdiv").empty();
                $("#escapSeqdiv").append('{Escape Sequences}<br>');
                $(e).each(function (i, d) {
                    $("#escapSeqdiv").append('<p>=> <code>' + d.patterrn + '</code> for <u>' + d.description + '</u> </p>');
                    //console.log(d);
                });
                
            }

            function populateSelect(s, v) {
                s.empty();
                //s.append('<option value="-1">Select</option>');
                $(v).each(function (i, d) {
                    s.append('<option value="' + d.id + '" workbench-cond=\'' + JSON.stringify(d) + '\'>' + d.name + '</option>');
                });
            }
            $("#Chosen").on("change", function (e) {
                var v = $(this).val();
                v=JSON.parse($(this).find("option:selected").attr('workbench-cond'));
                initChosenWorkBench(v);
            });
            function initChosenWorkBench(cond) {
                //var cond = cases.find(function (d) {
                //    return d.id == v;
                //});
                
                $("#trimm").prop('checked', cond.trimm);
                $("#splitter").val(cond.splitter);
                $("#defaultEachLinePrefix").val(cond.defaultEachLinePrefix);
                $("#defaultEachLineSuffix").val(cond.defaultEachLineSuffix);
                $("#defaultWholeDocPrefix").val(cond.defaultWholeDocPrefix);
                $("#defaultWholeDocSuffix").val(cond.defaultWholeDocSuffix);
            }
            $("#genBtn").click(function () {
                generateString();
            });
            
            function generateString() {
                var whatToDo = $("#Chosen").val();
                var FromWhat = $("#inputStr").val();
                var ToThis = "";
                
                //if trim
                if ($("#trimm").is(":checked")) { FromWhat = FromWhat.trim(); }
                //if remove
                var remThese = $("#remThese").val();
                
                if ($("#ifRem").is(":checked")) {
                    var FromWhat2 = "";
                    
                        
                    var remArr = remThese.split(" ");
                    
                    FromWhat2 = escapeAndRemoveThis(FromWhat, escapes, '');

                    //console.log([FromWhat, FromWhat.trim(), FromWhat2]);
                    remArr.forEach(function (d, i, o) {

                        var narr2 = FromWhat2.split(d);
                        //console.log([d,narr2]);
                        FromWhat2 = narr2.join("");
                    });
                    
                    //console.log([FromWhat, FromWhat2]);
                    FromWhat = FromWhat2.trim();
                }

                var splitter = $("#splitter").val();
                var TheArray = FromWhat.split(splitter);
                var preFix = $("#defaultEachLinePrefix").val();
                var sufFix = $("#defaultEachLineSuffix").val();
                var docPreFix = $("#defaultWholeDocPrefix").val();
                var docSufFix = $("#defaultWholeDocSuffix").val();

                $(TheArray).each(function (i, d) {
                    //ToThis += ""+ preFix  + this +  sufFix + "\n";
                    //ToThis += "\n" + escapeThis(preFix, escapes, this) + this + escapeThis(sufFix, escapes, this) + "";
					ToThis += "" + escapeThis(preFix, escapes, this) + this + escapeThis(sufFix, escapes, this) + "";
                });
                var ToThis = escapeThis(docPreFix, escape, '') + ToThis + escapeThis(docSufFix,escapes,'');
                
                $("#outs").val(ToThis);
            }

            function escapeThis(str,esc,data) {
                //var newStr="";
                $(esc).each(function (i, d) {
                    //console.log(d);
                    if (d.patterrn === "\\this") {
                        d.value = data;
                    }
                    var arr = [];
                    arr = str.split(d.patterrn);
                    str = arr.join(d.value);
                });
                return str;
            }
            function escapeAndRemoveThis(str, esc, data) {
                //var newStr="";
                $(esc).each(function (i, d) {
                    //console.log(d);
                    if (d.patterrn === "\\this") {
                        d.value = data;
                    }
                    var arr = [];

                    arr = str.split(d.patterrn);
                    str = arr.join(data);
                    console.log([arr,str]);
                });
                
                return str;
            }
        });