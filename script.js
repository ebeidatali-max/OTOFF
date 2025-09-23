// مكتبة jsPDF للتحويل إلى PDF
const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', () => {
    const assessmentForm = document.getElementById('assessmentForm');
    const saveProgressBtn = document.getElementById('saveProgressBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const downloadWordBtn = document.getElementById('downloadWordBtn');
    const printBtn = document.getElementById('printBtn');

    const generalGoalsContainer = document.getElementById('generalGoalsContainer');
    const specificGoalsContainer = document.getElementById('specificGoalsContainer');
    const addGoalButtons = document.querySelectorAll('.add-goal-btn');

    // تحميل التقدم المحفوظ عند بدء التحميل
    loadProgress();

    // تشغيل الحفظ التلقائي كل دقيقة
    setInterval(saveProgress, 60000); // 60000 مللي ثانية = 1 دقيقة

    // --- وظائف تفاعل الواجهة ---

    // التعامل مع اختيار الخيارات في الجداول العادية وخيارات الـ check-option
    assessmentForm.addEventListener('click', (event) => {
        const target = event.target;

        // للخيارات بنقرة واحدة (ليست check-option)
        if (target.classList.contains('level') && !target.classList.contains('check-option') && target.parentElement.dataset.item) {
            const optionsContainer = target.parentElement;
            // إزالة التحديد من جميع الخيارات في هذا البند
            Array.from(optionsContainer.children).forEach(span => {
                span.classList.remove('selected');
            });
            // تحديد الخيار الذي تم النقر عليه
            target.classList.add('selected');
            saveProgress(); // حفظ التقدم بعد كل اختيار
        }
        // للخيارات من نوع check-option (داخل الجداول)
        else if (target.classList.contains('check-option') && target.closest('tr')) {
            const row = target.closest('tr');
            const optionsInRow = row.querySelectorAll('.check-option');

            // إزالة التحديد من جميع خيارات check-option في نفس الصف
            optionsInRow.forEach(option => {
                option.classList.remove('selected');
            });

            // تحديد الخيار الذي تم النقر عليه
            target.classList.add('selected');
            saveProgress();
        }
        // للخيارات المتعددة الاختيار (مثل نوع القبضة)
        else if (target.classList.contains('level') && target.classList.contains('check-option') && target.parentElement.classList.contains('multi-select')) {
            target.classList.toggle('selected');
            saveProgress();
        }
    });

    // التعامل مع تغيير قيم حقول الإدخال والنصوص
    assessmentForm.addEventListener('input', (event) => {
        const target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            saveProgress();
        }
    });

    // --- وظائف الأهداف الديناميكية ---

    addGoalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const goalType = event.target.dataset.goalType;
            addGoalInput(goalType, ''); // إضافة حقل فارغ جديد
            saveProgress();
        });
    });

    function addGoalInput(type, value = '') {
        const container = type === 'general' ? generalGoalsContainer : specificGoalsContainer;
        const goalItemDiv = document.createElement('div');
        goalItemDiv.classList.add('goal-item');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = type === 'general' ? 'اكتب الهدف العام هنا...' : 'اكتب الهدف الخاص هنا...';
        input.value = value;
        input.dataset.goalType = type; // لتحديد نوع الهدف عند الحفظ

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('delete-goal-btn');
        deleteButton.textContent = 'حذف';
        deleteButton.addEventListener('click', () => {
            goalItemDiv.remove();
            saveProgress();
        });

        goalItemDiv.appendChild(input);
        goalItemDiv.appendChild(deleteButton);
        container.appendChild(goalItemDiv);

        input.addEventListener('input', saveProgress); // حفظ عند تغيير النص
    }

    // --- وظائف الحفظ والتحميل ---

    function saveProgress() {
        const data = {};

        // حفظ حقول المعلومات الخاصة بالطالب والخلفية الطبية وملاحظات المعالج والتوصيات
        assessmentForm.querySelectorAll('[data-field]').forEach(input => {
            if (input.type === 'date') {
                data[input.dataset.field] = input.value;
            } else if (input.tagName === 'TEXTAREA') {
                data[input.dataset.field] = input.value;
            } else { // Inputs for student info
                data[input.dataset.field] = input.value;
            }
        });

        // حفظ خيارات التقييم بنقرة واحدة (غير جداول)
        assessmentForm.querySelectorAll('.options[data-item]').forEach(optionsContainer => {
            const itemId = optionsContainer.dataset.item;
            // للخيارات المتعددة الاختيار
            if (optionsContainer.classList.contains('multi-select')) {
                const selectedValues = Array.from(optionsContainer.querySelectorAll('.level.selected'))
                                           .map(span => span.dataset.value);
                data[itemId] = selectedValues;
            } else { // للخيارات الفردية
                const selectedLevel = optionsContainer.querySelector('.level.selected');
                if (selectedLevel) {
                    data[itemId] = selectedLevel.dataset.value;
                }
            }
        });

        // حفظ خيارات الجداول (check-option وملاحظات)
        assessmentForm.querySelectorAll('.assessment-table tbody tr').forEach(row => {
            const itemId = row.dataset.itemId;
            const selectedOption = row.querySelector('.check-option.selected');
            const notesInput = row.querySelector('input[data-field="notes"]');

            data[itemId] = {
                selected: selectedOption ? selectedOption.dataset.value : null,
                notes: notesInput ? notesInput.value : ''
            };
        });

        // حفظ الأهداف الديناميكية
        const generalGoals = [];
        generalGoalsContainer.querySelectorAll('.goal-item input').forEach(input => {
            generalGoals.push(input.value);
        });
        data.generalGoals = generalGoals;

        const specificGoals = [];
        specificGoalsContainer.querySelectorAll('.goal-item input').forEach(input => {
            specificGoals.push(input.value);
        });
        data.specificGoals = specificGoals;

        localStorage.setItem('assessmentProgress', JSON.stringify(data));
        console.log('تم حفظ التقدم تلقائياً.');
    }

    function loadProgress() {
        const savedProgress = localStorage.getItem('assessmentProgress');
        if (savedProgress) {
            const data = JSON.parse(savedProgress);

            // استعادة حقول المعلومات الخاصة بالطالب والخلفية الطبية وملاحظات المعالج والتوصيات
            for (const field in data) {
                const input = assessmentForm.querySelector(`[data-field="${field}"]`);
                if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
                    input.value = data[field];
                }
            }

            // استعادة خيارات التقييم بنقرة واحدة (غير جداول)
            assessmentForm.querySelectorAll('.options[data-item]').forEach(optionsContainer => {
                const itemId = optionsContainer.dataset.item;
                const savedValue = data[itemId];

                if (savedValue) {
                    Array.from(optionsContainer.children).forEach(span => {
                        span.classList.remove('selected');
                    });
                    // للخيارات المتعددة الاختيار
                    if (optionsContainer.classList.contains('multi-select') && Array.isArray(savedValue)) {
                        savedValue.forEach(val => {
                            const levelToSelect = optionsContainer.querySelector(`.level[data-value="${val}"]`);
                            if (levelToSelect) {
                                levelToSelect.classList.add('selected');
                            }
                        });
                    } else { // للخيارات الفردية
                        const levelToSelect = optionsContainer.querySelector(`.level[data-value="${savedValue}"]`);
                        if (levelToSelect) {
                            levelToSelect.classList.add('selected');
                        }
                    }
                }
            });

            // استعادة خيارات الجداول (check-option وملاحظات)
            assessmentForm.querySelectorAll('.assessment-table tbody tr').forEach(row => {
                const itemId = row.dataset.itemId;
                const savedItemData = data[itemId];

                if (savedItemData) {
                    const optionsInRow = row.querySelectorAll('.check-option');
                    optionsInRow.forEach(option => option.classList.remove('selected'));

                    if (savedItemData.selected) {
                        const optionToSelect = row.querySelector(`.check-option[data-value="${savedItemData.selected}"]`);
                        if (optionToSelect) {
                            optionToSelect.classList.add('selected');
                        }
                    }
                    const notesInput = row.querySelector('input[data-field="notes"]');
                    if (notesInput && savedItemData.notes !== undefined) {
                        notesInput.value = savedItemData.notes;
                    }
                }
            });

            // استعادة الأهداف الديناميكية
            generalGoalsContainer.innerHTML = ''; // مسح الأهداف الحالية
            if (data.generalGoals && Array.isArray(data.generalGoals)) {
                data.generalGoals.forEach(goal => addGoalInput('general', goal));
            }

            specificGoalsContainer.innerHTML = ''; // مسح الأهداف الحالية
            if (data.specificGoals && Array.isArray(data.specificGoals)) {
                data.specificGoals.forEach(goal => addGoalInput('specific', goal));
            }

            console.log('تم تحميل التقدم المحفوظ.');
        } else {
            // إضافة هدف واحد افتراضي عند البدء إذا لم يكن هناك تقدم محفوظ
            if (generalGoalsContainer.children.length === 0) {
                addGoalInput('general', '');
            }
            if (specificGoalsContainer.children.length === 0) {
                addGoalInput('specific', '');
            }
        }
    }


    // --- وظائف الأزرار السفلية ---

    saveProgressBtn.addEventListener('click', () => {
        saveProgress();
        alert('تم حفظ التقدم يدوياً!');
    });

    printBtn.addEventListener('click', () => {
        window.print();
    });

    downloadPdfBtn.addEventListener('click', () => {
        const formContent = document.getElementById('assessmentForm');

        // استخدام html2canvas لتحويل المحتوى إلى صورة أولاً
        html2canvas(formContent, {
            scale: 2, // لزيادة جودة الصورة في PDF
            useCORS: true, // مهم إذا كانت هناك صور أو موارد خارجية
            windowWidth: formContent.scrollWidth,
            windowHeight: formContent.scrollHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            const doc = new jsPDF('p', 'mm', 'a4');
            let position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save("تقرير_التقييم_العلاجي.pdf");
        });
    });

    downloadWordBtn.addEventListener('click', () => {
        const header = `
            <html dir="rtl" lang="ar">
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Times New Roman', serif; direction: rtl; text-align: right; line-height: 1.5; }
                    h1 { text-align: center; color: #000; border-bottom: 1px solid #000; padding-bottom: 10px; }
                    h2 { color: #333; margin-top: 25px; margin-bottom: 15px; border-right: 4px solid #333; padding-right: 10px; background-color: #f0f0f0; }
                    h2.centered-title { text-align: center; border-right: none; border-bottom: 2px solid #333; width: fit-content; margin-left: auto; margin-right: auto; padding-bottom: 5px; background-color: transparent; }
                    h3 { color: #555; margin-top: 20px; border-right: 2px solid #666; padding-right: 8px; }
                    .section { margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                    .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 15px; }
                    .info-item label { font-weight: bold; display: block; margin-bottom: 5px; }
                    .info-item input[type="text"], .info-item input[type="date"], textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
                    .assessment-type .options, .single-choice-group .options { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; margin-top: 10px; }
                    .level { padding: 5px 10px; border: 1px solid #aaa; border-radius: 15px; background-color: #f0f0f0; color: #333; font-size: 0.9em; }
                    .level.selected { background-color: #007bff; color: white; border-color: #0056b3; font-weight: bold; }
                    .check-option { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 4px; border: 1px solid #aaa; background-color: #f0f0f0; color: transparent; font-size: 1em; }
                    .check-option.selected { background-color: #28a745; color: white; border-color: #218838; }
                    .check-option.selected::before { content: '✓'; font-weight: bold; }
                    .assessment-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px; }
                    .assessment-table th, .assessment-table td { border: 1px solid #ddd; padding: 10px; text-align: right; vertical-align: top; }
                    .assessment-table th { background-color: #007bff; color: white; font-weight: bold; }
                    .assessment-table td input[type="text"] { width: 95%; border: none; background-color: transparent; padding: 0; }
                    .goal-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; border: 1px dashed #ccc; padding: 8px 12px; border-radius: 6px; }
                    .goal-item input[type="text"] { flex-grow: 1; border: none; padding: 0; background-color: transparent; }
                    .delete-goal-btn, .add-goal-btn, .controls button { display: none; } /* إخفاء الأزرار في Word */
                </style>
            </head>
            <body>
        `;
        const footer = `</body></html>`;

        // إزالة الأزرار الديناميكية مؤقتًا لعدم ظهورها في ملف Word
        const tempForm = document.getElementById('assessmentForm').cloneNode(true);
        tempForm.querySelectorAll('.delete-goal-btn, .add-goal-btn, .controls').forEach(el => el.remove());

        // جعل حقول الإدخال تظهر كنصوص في Word
        tempForm.querySelectorAll('input[type="text"], input[type="date"], textarea').forEach(input => {
            const p = document.createElement('p');
            p.textContent = input.value;
            p.style.margin = '0';
            p.style.padding = '0';
            input.replaceWith(p);
        });

        // استبدال الخيارات المحددة بنص واضح
        tempForm.querySelectorAll('.options').forEach(optionsContainer => {
            const selectedOptions = Array.from(optionsContainer.querySelectorAll('.level.selected'))
                                           .map(span => span.textContent)
                                           .join('، ');
            if (selectedOptions) {
                const p = document.createElement('p');
                p.textContent = `الاختيار: ${selectedOptions}`;
                p.style.fontWeight = 'bold';
                p.style.marginBottom = '5px';
                optionsContainer.replaceWith(p);
            } else {
                optionsContainer.remove(); // إزالة إذا لم يتم تحديد شيء
            }
        });

        // تحويل محتوى الجدول ليظهر كجدول عادي في Word
        tempForm.querySelectorAll('.assessment-table').forEach(table => {
            table.querySelectorAll('.check-option').forEach(check => {
                const parentTd = check.closest('td');
                if (check.classList.contains('selected')) {
                    parentTd.textContent = '✓';
                } else {
                    parentTd.textContent = '';
                }
            });
        });


        const htmlContent = header + tempForm.outerHTML + footer;

        const blob = new Blob([htmlContent], {
            type: "application/msword;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "تقرير_التقييم_العلاجي.doc";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});