from django import forms
from .models import ChiNhanh

class ChiNhanhForm(forms.ModelForm):
    class Meta:
        model = ChiNhanh
        fields = ['ten_chi_nhanh', 'dia_chi', 'sdt', 'ma_nv_ql']