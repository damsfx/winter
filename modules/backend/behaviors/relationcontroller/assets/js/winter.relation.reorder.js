/*
 * Scripts for reordering in the Relation controller behavior.
 */
+function ($) {
    "use strict";


    console.log('init1', $('.drag-handle').parents('table.data tbody'));

    var ReorderRelationBehavior = function () {

        this.initSorting = function () {

            console.log('initSorting', typeof Sortable);

            if (typeof Sortable === 'undefined') return;
            var $tbody = window.jQuery('.drag-handle').parents('table.data tbody');

            if (!$tbody.length) {
                return
            }

            $tbody.each(function () {
                var data = {};
                var field = this.closest('div.form-group[data-field-name]');

                if (field) {
                    data.fieldName = field.dataset.fieldName;
                }
                Sortable.create(this, {
                    handle: '.drag-handle',
                    animation: 150,
                    onEnd: function (evt) {
                        var $inputs = $(evt.target).find('td>div.drag-handle>input');
                        var $form = $('<form style="display: none;">');
                        $form.append($inputs.clone())
                            // .request('onReorderRelation', {
                            .request('onRelationReorder', {
                                data: data,
                                loading: $.wn.stripeLoadIndicator,
                                complete: function () {
                                    $form.remove();
                                }
                            });
                    }
                });
            });
        }
    }

    $.wn.reorderRelationBehavior = new ReorderRelationBehavior;

    $(document).render(function () {
        $.wn.reorderRelationBehavior.initSorting();
    })
    // $.wn.reorderRelationBehavior.initSorting();
    $(window).on('ajaxUpdateComplete', $.wn.reorderRelationBehavior.initSorting)

}(window.jQuery);
