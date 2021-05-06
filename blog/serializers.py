from rest_framework import serializers

from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        # fields = ('id', 'title', 'content')
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        # fields = ['name', 'website', 'body', 'published_on']
        fields = '__all__'
