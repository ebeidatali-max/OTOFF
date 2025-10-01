// ==========================================================
// 1. تعريف البيانات لكل جدول (قوائم البنود)
// ==========================================================

const educationItems = [
    "يجلس الطالب في الصف على كرسي وطاولة ملائمين", "يجلس الطالب بالصف على الفرشة", 
    "يستخدم الطالب الايباد الموجود داخل الصف", "يستخدم الطالب البروجكتير داخل الصف"
];
const mobilityItems = [
    "يتنقل مشيا على الاقدام", "يتنقل الطالب زحفا على الأطراف", 
    "يتنقل الطالب بواسطة كرسي متحرك خاص به", "يتنقل الطالب باستخدام الووكر", 
    "ينتقل الطالب من الكرسي المتحرك الي كرسي الصف", "يتنقل الطالب من الكرسي المتحرك الى كرسي الحمام",
    "يتنقل الطالب من الكرسي المتحرك الى تخت الحمام", "يصعد الطالب الدرج",
    "ينزل الطالب الدرج", "يستخدم الطالب المصعد", "يتنقل الطالب داخل مرافق المدرسة"
];
const foodInitialItems = ["يتناول الطالب الطعام بشكل سليم", "يمييز الطالب أدوات الطعام واستخداماتها"];
const foodDetailedItems = [
    "يتوجه الطالب ل طلب الطعام", "يوجه الطالب الطعام نحو فمه", 
    "يتناول الطالب الساندويش", "يتناول الطالب الطعام ب استخدام الملعقة", 
    "يغرف الطالب الطعام باستخدام الملعقة","يضم الطالب شفتيه على الملعقة ويسحب الطعام", 
    "يبقي الطالب الطعام في الفم اثناء المضغ", "يحافظ الطالب على نظافته ونظافة المكان من حوله اثناء الطعام"
];
const bathroomYNItems = ["يلبس الطالب الحفاظ", "يستطيع ان يضبط عملية التبول", "يستطيع ان يضبط عملية الإخراج"];
const bathroomAbilityItems = ["يطلب الذهاب الى الحمام", "يستطيع الذهاب الى الحمام و استخدامه"];
const selfCareItems = [
    "يمييز الطالب قطع الملابس المناسبة", "يلبس الطالب الجوارب", "يخلع الطالب الجوارب", 
    "يلبس الطالب الحذاء", "يخلع الطالب الحذاء", "يغلق و يفتح السكوتش", 
    "يربط رباط الحذاء", "يساعد في عملي اللباس", "يفتح و يغلق السحاب", 
    "يلبس المعطف", "يخلع المعطف", 
    "يغسل الطالب يديه", "يغسل الطالب وجهه", "ينظف الطالب اسنانه", "يمشط الطالب شعره"
];
const motorSkillsItems = [
    "لدى الطالب مدى حركي كامل في الذراع اليمنى AROM", "لدى الطالب مدى حركي كامل في الذراع اليسرى AROM",
    "لدى الطالب مدى حركي كامل في الذراع اليمنى PROM", "لدى الطالب مدى حركي كامل في الذراع اليسرى PROM",
    "لدى الطالب مدى حركي كامل في القدم اليمنى AROM", "لدى الطالب مدى حركي كامل في القدم اليسرى AROM",
    "لدى الطالب مدى حركي كامل في القدم اليمنى PROM", "لدى الطالب مدى حركي كامل في القدم اليسرى PROM",
    "لدى الطالب سيطرة على الرأس والجذع", "يحرك الطالب رأسه نحو اليمين واليسار"
];
const sittingItems = ["يجلس الطالب بدون دعم", "يجلس الطالب مع دعم", "يحافظ على التوازن في عملية الجلوس"];
const standingItems = ["يقف الطالب بدون دعم", "بحاجة الى دعم عند الوقوف", "يحافظ على التوازن اثناء عملية الوقوف", "يلتقط الطالب الأغراض من الأرض"];
const attentionItems = [
    "فترة تركيزه ملائمة للفعالية", "ينفذ الارشادات والاوامر", "يشارك كلاميا",
    "يشارك حركيا بالأنشطة", "ينتظر الدور", "ينهي المهمة المطلوبة منه",
    "مرونة في الانتقال بين الفعاليات"
];
const tableSkillsItems = ["لدى الطالب تتبع بصري", "لدى الطالب تآزر عين يد", "يقطع خط المنتصف", "تآزر يد - يد", "Hand-hand manipulation", "In hand manipulation"];
const sensoryItems = [
    "يلف برأسه ك استجابة عند مناداة اسمه", "قادر على الحفاظ على التواصل البصري مع الاخرين",
    "يشير الى الأشياء التي تثير اهتمامه", "عادة ما يلعب ب الألعاب دون وضعها في فمه",
    "يستمتع باللعب ب الألعاب ذات الملامس المختلفة", "يستمتع باللعب ب الالعاب الموسيقية المختلفة",
    "يستمتع عند استخدام الماء", "قادر على تهدئة نفيه عندما ينزعج",
    "قادر على التهدئة بواسطة الهز واللمس والاصوات المريحة", "يبكي و يهدئ شعوره عند الألم"
];

// بنود تقييم اللعب الجديدة (تم تطبيقها بجدول 5 أعمدة)
const playSkillsItems = [
    "المبادرة: التعامل مع الأشخاص أو الأدوات.",
    "التنظيم أو الضبط",
    "القدرة على دمج الخيال بالواقع",
    "المتعة: إظهار الفرح والحيوية والانخراط في اللعبة",
    "التبادلية: إظهار اهتمام وانخراط مع الآخر، المشاركة بالمتعة",
    "اللعبية: نشيط، آمن، يظهر حيوية، يواجه تحديات ويتغلب على العقبات",
    "يشارك بروح مرحة وخيالية",
    "لعب حسي-حركي: استكشاف حسي – حركي للأجسام والبيئة",
    "اللعب الوظيفي: استخدام الجسم حسب التعليمات",
    "اللعب الرمزي 1: توجيه أفعال على غرض حقيقي (إطعام دمية بالمعلقة)",
    "اللعب الرمزي 2: استخدام غرض مشابه بدلاً من الغرض الحقيقي (كوب لعبة بدل الحقيقي)",
    "اللعب الرمزي 3: استخدام أي غرض كبديل للغرض الحقيقي دون علاقة مباشرة (مكعب كملعقة)",
    "اللعب الرمزي 4: القيام بأفعال تخيلية بدون الحاجة لغرض مادي (التظاهر بالشرب)",
    "اللعب الرمزي 5: عدة أطفال يلعبون أدوارا معاً (طبيب، بائع، عائلة)",
    "ألعاب البناء والتركيب: تركيب وبناء أشياء، ابتكار محتوى جديد",
    "ألعاب بالقوانين: ألعاب جماعية منظمة (دومينو، بطاقات)",
    "ألعاب حركة ورياضة: استخدام أي غرض كبداية للنشاط من غير الاعتماد على الغرض الأصلي"
];

const gripTypes = ["Cylindrical", "Spherical", "Hook", "Pinch", "Tripod", "Lumbrical"];

// ==========================================================
// 2. دالة بناء الجداول
// ==========================================================

function buildTable(containerId, items, type) {
    let tableHTML = '<table><thead><tr><th>البند</th>';

    if (type === '5-col-yes-no') {
        tableHTML += '<th>يستطيع</th><th>لا يستطيع</th><th>غير ملائم</th><th>ملاحظات</th></tr></thead><tbody>';
    } else if (type === '7-col-independance') {
        tableHTML += '<th>مستقل</th><th>مساعدة جزئية</th><th>مساعدة كاملة</th><th>غير مستقل</th><th>غير ملائم</th><th>ملاحظات</th></tr></thead><tbody>';
    } else if (type === '3-col-yes-no') {
        tableHTML += '<th>نعم</th><th>لا</th><th>ملاحظات</th></tr></thead><tbody>';
    } else if (type === '4-col-yes-no-sensory') {
        tableHTML += '<th>نعم</th><th>لا</th><th>غير ملائم</th><th>ملاحظات</th></tr></thead><tbody>';
    }

    items.forEach((item, index) => {
        const rowId = `${containerId}-${index}`;
        tableHTML += `<tr><td data-item-text="${item}">${item}</td>`;

        if (type === '5-col-yes-no') {
            tableHTML += `
                <td><input type="radio" name="${rowId}" value="يستطيع" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="لا يستطيع" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="غير ملائم" onchange="saveTemporaryData()"></td>
                <td><textarea id="note-${rowId}" class="note-input" onchange="saveTemporaryData()"></textarea></td>`;
        } else if (type === '7-col-independance') {
            tableHTML += `
                <td><input type="radio" name="${rowId}" value="مستقل" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="مساعدة جزئية" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="مساعدة كاملة" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="غير مستقل" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="غير ملائم" onchange="saveTemporaryData()"></td>
                <td><textarea id="note-${rowId}" class="note-input" onchange="saveTemporaryData()"></textarea></td>`;
        } else if (type === '3-col-yes-no') {
             tableHTML += `
                <td><input type="radio" name="${rowId}" value="نعم" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="لا" onchange="saveTemporaryData()"></td>
                <td><textarea id="note-${rowId}" class="note-input" onchange="saveTemporaryData()"></textarea></td>`;
        } else if (type === '4-col-yes-no-sensory') {
             tableHTML += `
                <td><input type="radio" name="${rowId}" value="نعم" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="لا" onchange="saveTemporaryData()"></td>
                <td><input type="radio" name="${rowId}" value="غير ملائم" onchange="saveTemporaryData()"></td>
                <td><textarea id="note-${rowId}" class="note-input" onchange="saveTemporaryData()"></textarea></td>`;
        }
        
        tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    document.getElementById(containerId).innerHTML = tableHTML;
}

/**
 * دالة خاصة لبناء جدول أنواع القبضة
 */
function buildGripTable(containerId, gripTypes) {
    let tableHTML = '<table><thead><tr><th>نوع القبضة</th><th>اليد اليمنى</th><th>اليد اليسرى</th></tr></thead><tbody>';

    gripTypes.forEach(grip => {
        const rowId = `grip-${grip}`;
        tableHTML += `
            <tr>
                <td data-item-text="${grip}">${grip}</td>
                <td><input type="checkbox" name="${rowId}-right" value="${grip}-right" onchange="saveTemporaryData()"></td>
                <td><input type="checkbox" name="${rowId}-left" value="${grip}-left" onchange="saveTemporaryData()"></td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    document.getElementById(containerId).innerHTML = tableHTML;
}

// ==========================================================
// 3. وظائف التحميل (Word/PDF) - (تم ضبطها لترتيب الملخصات والخط)
// ==========================================================

function downloadAsPDF() {
    const element = document.getElementById('assessment-container'); 

    const options = {
        margin: [10, 10, 10, 10], 
        filename: 'Occupational_Therapy_Assessment.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, dpi: 192, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
}

/**
 * وظيفة التحميل كملف Word: تم تحسينها لضمان الترتيب الصحيح والخط Arial.
 */
function downloadAsWord() {
    const studentName = document.getElementById('student-name').value || 'غير محدد';
    const filename = `استمارة_تقييم_علاج_وظيفي_${studentName}.doc`;
    
    // إعداد رأس الملف
    let wordContent = `<h1 style="text-align: center; color: #38761d;">استمارة تقييم علاج وظيفي</h1>`;
    wordContent += `<p style="text-align: center; font-size: 11pt; color: #555;">مدرسة البكرية</p>`;
    wordContent += `<p><strong>اسم الطالب:</strong> ${document.getElementById('student-name').value || 'غير محدد'}</p>`;
    wordContent += `<p><strong>تاريخ التقييم:</strong> ${document.getElementById('assessment-date').value || 'غير محدد'}</p>`;
    wordContent += `<p><strong>اسم المعالج:</strong> ${document.getElementById('therapist-name').value || 'غير محدد'}</p>`;
    wordContent += '<hr style="margin: 20px 0;">';

    // تجميع كل الأقسام
    document.querySelectorAll('section').forEach(section => {
        const titleElement = section.querySelector('h2, h3:first-of-type');
        if (!titleElement) return;

        wordContent += `<h2 style="text-align: center;">${titleElement.textContent.trim()}</h2>`;
        
        // 1. استخلاص البيانات الأساسية (نصوص، تواريخ، راديو أفقي)
        section.querySelectorAll('[data-export-label]:not(div[id$="goals-container"])').forEach(input => {
            const label = input.getAttribute('data-export-label') || input.previousElementSibling?.textContent.trim();
            let value = '';
            
            if (input.tagName === 'TEXTAREA' || input.type === 'text' || input.type === 'date') {
                value = input.value;
            } else if (input.classList.contains('radio-group-horizontal')) {
                const selectedRadio = input.querySelector(`input[name="${input.querySelector('input').name}"]:checked`);
                value = selectedRadio ? selectedRadio.value : 'لم يتم الاختيار';
            }

            if (value && value !== 'لم يتم الاختيار' && value !== '') {
                 wordContent += `<p><strong>${label}:</strong> ${value}</p>`;
            }
        });
        
        // 2. استخلاص الجداول التفاعلية (مع العناوين الفرعية)
        section.querySelectorAll('div[id$="-table"]').forEach(tableDiv => {
            const h3Title = tableDiv.previousElementSibling?.tagName === 'H3' ? `<h3 style="text-align: right;">${tableDiv.previousElementSibling.textContent.trim()}</h3>` : '';
            wordContent += h3Title; 

            const table = tableDiv.querySelector('table');
            if (table) {
                const clonedTable = table.cloneNode(true);
                
                clonedTable.querySelectorAll('tr').forEach(row => {
                    const itemText = row.querySelector('td[data-item-text]')?.textContent.trim();
                    if (!itemText) return;

                    row.querySelectorAll('td').forEach((cell, cellIndex) => {
                        const selectedRadio = cell.querySelector('input[type="radio"]:checked');
                        const checkedCheckboxes = cell.querySelectorAll('input[type="checkbox"]:checked');
                        const noteTextarea = cell.querySelector('textarea');

                        if (selectedRadio) {
                            cell.innerHTML = `<strong>${selectedRadio.value}</strong>`;
                        } else if (checkedCheckboxes.length > 0) {
                            cell.innerHTML = '✅';
                        } else if (noteTextarea) {
                            cell.innerHTML = noteTextarea.value.trim() ? `[ملاحظة]: ${noteTextarea.value.trim()}` : '';
                        } else if (cellIndex > 0) {
                            if (cell.querySelector('input[type="checkbox"]')) {
                                cell.innerHTML = '❌';
                            } else if (cell.querySelector('input[type="radio"]')) {
                                cell.innerHTML = '-'; 
                            }
                        }
                    });
                });
                wordContent += clonedTable.outerHTML;
            }
        });

        // 3. استخلاص التلخيصات اليدوية (تظهر بعد الجداول)
        section.querySelectorAll('textarea[id^="summary-"]').forEach(input => {
             if (input.value) {
                 const summaryTitle = input.previousElementSibling.textContent.trim();
                 wordContent += `<p style="font-weight: bold; margin-top: 15px;">${summaryTitle}:</p><div style="border: 1px dashed #ccc; padding: 10px; margin-bottom: 15px; white-space: pre-wrap; background: #f9f9f9;">${input.value}</div>`;
             }
        });
        
        // 4. استخلاص الأهداف (في نهاية الأقسام ذات الصلة)
        section.querySelectorAll('div[id$="goals-container"]').forEach(input => {
            const label = input.getAttribute('data-export-label');
            const goals = Array.from(input.querySelectorAll('textarea')).map(ta => ta.value).filter(v => v.trim() !== '');
            if (goals.length > 0) {
                wordContent += `<p style="font-weight: bold; margin-top: 15px;">${label}:</p><ul style="margin-right: 20px; padding: 5px;"><li>${goals.join('</li><li>')}</li></ul>`;
            } else if(label) {
                 wordContent += `<p><strong>${label}:</strong> لا توجد أهداف مُضافة.</p>`;
            }
        });


        wordContent += '<hr style="margin-top: 20px; border: 1px dotted #ccc;">';
    });

    // إعداد الـ Blob للتحميل (مع ستايلات Arial)
    const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>استمارة تقييم علاج وظيفي</title>
            <style>
                /* ضبط الخط في ملف الوورد إلى Arial */
                body { font-family: 'Arial', sans-serif; direction: rtl; text-align: right; line-height: 1.6; font-size: 11pt; }
                h1, h2, h3 { color: #38761d; text-align: right; border-bottom: 2px solid #93c47d; padding-bottom: 5px; margin-top: 25px; }
                h1 { text-align: center; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; table-layout: fixed; font-size: 10pt;}
                th, td { border: 1px solid #444; padding: 8px; text-align: center; vertical-align: middle; }
                th { background-color: #f0f0f0; color: #333; font-weight: bold; }
                td:first-child { text-align: right; width: 30%; }
                p { margin: 5px 0; }
                strong { font-weight: bold; }
                ul { list-style-type: disc; margin-right: 30px; margin-bottom: 15px;}
            </style>
        </head>
        <body>${wordContent}</body>
        </html>`;

    const file = new Blob([htmlContent], { type: 'application/msword' });
    const a = document.createElement("a");
    
    a.href = URL.createObjectURL(file);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert('✅ تم بدء تحميل ملف Word. (تم تحسين التنسيق لملف Word باستخدام خط Arial).');
}


// ==========================================================
// 4. إدارة الأهداف والتخزين (لم يتغير المنطق)
// ==========================================================

function createGoalItem(initialValue = '') {
    const container = document.createElement('div');
    container.className = 'goal-item-container';

    const textarea = document.createElement('textarea');
    textarea.rows = 2;
    textarea.value = initialValue;
    textarea.className = 'goal-item';
    textarea.placeholder = 'صيغة الهدف (يفضل استخدام صيغة SMART): مثال: سيتمكن الطالب من ...';
    
    textarea.addEventListener('change', saveTemporaryData);
    textarea.addEventListener('input', saveTemporaryData);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-goal-btn';
    deleteButton.innerHTML = '<i class="fas fa-times-circle"></i>';
    deleteButton.type = 'button';
    
    deleteButton.addEventListener('click', () => {
        container.remove();
        saveTemporaryData();
    });

    container.appendChild(textarea);
    container.appendChild(deleteButton);
    return container;
}

function addGoal(event) {
    const target = event.target.closest('.add-goal-btn').getAttribute('data-target');
    const containerId = (target === 'general') ? 'general-goals-container' : 'specific-goals-container';
    const container = document.getElementById(containerId);
    
    container.appendChild(createGoalItem());
    saveTemporaryData();
}

function saveTemporaryData() {
    const allData = {};
    
    document.querySelectorAll('input, textarea, select').forEach(element => {
        const key = element.id || element.name;
        if (!key) return;
        
        if (element.closest('.goal-item-container')) return; 

        if (element.type === 'radio' && element.checked) {
            allData[element.name] = element.value;
        } else if (element.type === 'checkbox' && element.checked) {
             if (!allData[element.name]) allData[element.name] = [];
             allData[element.name].push(element.value);
        } else if (element.type !== 'radio' && element.type !== 'checkbox') {
            allData[key] = element.value;
        }
    });
    
    const generalGoals = Array.from(document.getElementById('general-goals-container').querySelectorAll('textarea')).map(ta => ta.value);
    const specificGoals = Array.from(document.getElementById('specific-goals-container').querySelectorAll('textarea')).map(ta => ta.value);

    allData['general-goals'] = generalGoals;
    allData['specific-goals'] = specificGoals;

    localStorage.setItem('occupationalTherapyDraft', JSON.stringify(allData));
    console.log('✅ تم حفظ البيانات مؤقتاً بنجاح.');
}

function loadTemporaryData() {
    const savedData = localStorage.getItem('occupationalTherapyDraft');
    const data = savedData ? JSON.parse(savedData) : {};
    
    for (const key in data) {
        if (key === 'general-goals' || key === 'specific-goals') continue;

        const element = document.getElementById(key);
        
        if (element) {
            element.value = data[key];
        } else if (document.querySelector(`[name="${key}"]`)) {
            if (!Array.isArray(data[key])) {
                const radio = document.querySelector(`[name="${key}"][value="${data[key]}"]`);
                if (radio) radio.checked = true;
            } else {
                data[key].forEach(val => {
                    const checkbox = document.querySelector(`[name="${key}"][value="${val}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
        }
    }
    
    const loadGoals = (containerId, goalsArray) => {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        if (goalsArray && goalsArray.length > 0) {
            goalsArray.forEach(goal => container.appendChild(createGoalItem(goal)));
        } else {
            // إضافة هدف مبدئي واحد لضمان وجود حقل
            container.appendChild(createGoalItem()); 
        }
    };
    
    loadGoals('general-goals-container', data['general-goals']);
    loadGoals('specific-goals-container', data['specific-goals']);

    if (savedData) console.log('تم تحميل البيانات المؤقتة بنجاح.');
}

function clearStoredData() {
    if (confirm('⚠️ هل أنت متأكد أنك تريد مسح جميع البيانات المخزنة مؤقتاً؟')) {
        localStorage.removeItem('occupationalTherapyDraft');
        window.location.reload(); 
    }
}


// ==========================================================
// 5. تهيئة التطبيق عند التحميل
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. بناء الجداول الديناميكية
    buildTable('education-environment-table', educationItems, '5-col-yes-no');
    buildTable('mobility-table', mobilityItems, '7-col-independance');
    buildTable('food-initial-table', foodInitialItems, '5-col-yes-no');
    buildTable('food-detailed-table', foodDetailedItems, '7-col-independance');
    buildTable('bathroom-yn-table', bathroomYNItems, '3-col-yes-no');
    buildTable('bathroom-ability-table', bathroomAbilityItems, '5-col-yes-no');
    buildTable('self-care-table', selfCareItems, '7-col-independance');
    buildTable('motor-skills-table', motorSkillsItems, '5-col-yes-no');
    buildTable('sitting-table', sittingItems, '5-col-yes-no');
    buildTable('standing-table', standingItems, '5-col-yes-no');
    buildTable('attention-table', attentionItems, '5-col-yes-no');
    buildTable('table-skills-table', tableSkillsItems, '5-col-yes-no');
    buildTable('sensory-table', sensoryItems, '4-col-yes-no-sensory');
    
    // بناء جدول مهارات اللعب الجديد (5 أعمدة)
    buildTable('play-skills-table', playSkillsItems, '5-col-yes-no'); 

    // بناء جدول القبضة 
    buildGripTable('grip-type-table', gripTypes);

    // 2. ربط وظائف الأزرار والتحميل
    document.getElementById('print-btn').addEventListener('click', () => window.print());
    document.getElementById('save-temp-btn').addEventListener('click', saveTemporaryData);
    document.getElementById('clear-data-btn').addEventListener('click', clearStoredData);
    
    document.getElementById('download-pdf-btn').addEventListener('click', downloadAsPDF);
    document.getElementById('download-word-btn').addEventListener('click', downloadAsWord);

    // 3. إضافة الأهداف
    document.querySelectorAll('.add-goal-btn').forEach(button => {
        button.addEventListener('click', addGoal);
    });

    // 4. تحميل البيانات 
    loadTemporaryData();
    
    // 5. ربط حقول الإدخال بالحفظ المؤقت
    document.querySelectorAll('textarea:not(.note-input):not(.goal-item)').forEach(element => {
        element.addEventListener('change', saveTemporaryData);
    });
    document.querySelectorAll('input[type="text"], input[type="date"]').forEach(element => {
        element.addEventListener('change', saveTemporaryData);
    });
});
