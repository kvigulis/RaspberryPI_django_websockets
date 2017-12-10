from django.conf.urls import url
from . import views

app_name = 'pi_websocket'

urlpatterns = [
    # Main Filter View / Home of the website
    # /
    url(r'^$', views.index, name='index'),

]