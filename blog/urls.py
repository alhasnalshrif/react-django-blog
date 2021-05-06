from django.urls import path

from .views import (
    ArticleListView,
    ArticleDetailView,
    
    BlogPostCategoryView
)

urlpatterns = [
    path('posts/', ArticleListView.as_view()),
    path('<pk>', ArticleDetailView.as_view()),
    path('category', BlogPostCategoryView.as_view()),

]


